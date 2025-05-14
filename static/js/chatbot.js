// Chatbot Functionality
document.addEventListener('DOMContentLoaded', function() {
    // DOM elements
    const chatbotContainer = document.querySelector('.chatbot-container');
    const chatbotHeader = document.querySelector('.chatbot-header');
    const chatbotMessages = document.querySelector('.chatbot-messages');
    const chatbotInput = document.querySelector('.chatbot-input input');
    const chatbotSendBtn = document.querySelector('.chatbot-input button');
    const chatbotToggle = document.querySelector('.chatbot-toggle');
    const minimizeBtn = document.querySelector('.toggle-btn');
    const typingIndicator = document.querySelector('.typing-indicator');
    
    // Fallback responses (used when API fails)
    const fallbackResponses = {
        greeting: "Xin chào! Tôi là trợ lý ảo của trang web GIS và Remote Sensing. Tôi có thể giúp gì cho bạn?",
        error: "Xin lỗi, tôi đang gặp sự cố kết nối. Vui lòng thử lại sau."
    };
    
    // Quick reply options
    const quickReplies = [
        { text: "Giới thiệu trang web", value: "about" },
        { text: "Các dự án", value: "projects" },
        { text: "Công cụ GIS", value: "tools" },
        { text: "Bản đồ", value: "map" },
        { text: "Blog", value: "blog" },
        { text: "Liên hệ", value: "contact" },
        { text: "GIS là gì?", value: "gis" },
        { text: "Viễn thám là gì?", value: "remote_sensing" }
    ];
    
    // Initialize chatbot
    function initChatbot() {
        // Add welcome message
        setTimeout(() => {
            addBotMessage(getRandomResponse('greeting'));
            showQuickReplies();
        }, 500);
        
        // Event listeners
        chatbotHeader.addEventListener('click', toggleChatbot);
        minimizeBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            minimizeChatbot();
        });
        
        if (chatbotToggle) {
            chatbotToggle.addEventListener('click', maximizeChatbot);
        }
        
        chatbotSendBtn.addEventListener('click', sendMessage);
        chatbotInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }
    
    // Toggle chatbot open/close
    function toggleChatbot() {
        chatbotContainer.classList.toggle('active');
    }
    
    // Minimize chatbot
    function minimizeChatbot() {
        chatbotContainer.classList.remove('active');
    }
    
    // Maximize chatbot
    function maximizeChatbot() {
        chatbotContainer.classList.add('active');
    }
    
    // Add a bot message to the chat
    function addBotMessage(message) {
        showTypingIndicator();
        
        setTimeout(() => {
            hideTypingIndicator();
            
            const messageDiv = document.createElement('div');
            messageDiv.classList.add('message', 'bot-message');
            messageDiv.textContent = message;
            
            chatbotMessages.appendChild(messageDiv);
            scrollToBottom();
        }, 1000); // Simulate typing delay
    }
    
    // Add a user message to the chat
    function addUserMessage(message) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', 'user-message');
        messageDiv.textContent = message;
        
        chatbotMessages.appendChild(messageDiv);
        scrollToBottom();
    }
    
    // Show typing indicator
    function showTypingIndicator() {
        typingIndicator.style.display = 'flex';
        scrollToBottom();
    }
    
    // Hide typing indicator
    function hideTypingIndicator() {
        typingIndicator.style.display = 'none';
    }
    
    // Send a message
    async function sendMessage() {
        const message = chatbotInput.value.trim();
        
        if (message !== '') {
            // Add user message to chat
            addUserMessage(message);
            
            // Clear input
            chatbotInput.value = '';
            
            // Show typing indicator
            showTypingIndicator();
            
            try {
                // Generate bot response using AI
                const response = await getBotResponse(message);
                hideTypingIndicator();
                addBotMessage(response);
                
                // Show quick replies after bot responds
                setTimeout(showQuickReplies, 1500);
            } catch (error) {
                hideTypingIndicator();
                addBotMessage(fallbackResponses.error);
                console.error('Error in sendMessage:', error);
                
                // Show quick replies even if there's an error
                setTimeout(showQuickReplies, 1500);
            }
        }
    }
    

    
    // Get bot response using AI API
    async function getBotResponse(message) {
        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: message }),
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            return data.message;
        } catch (error) {
            console.error('Error calling chat API:', error);
            
            // Fallback to basic responses if API fails
            if (message.toLowerCase().includes('xin chào') || 
                message.toLowerCase().includes('chào') || 
                message.toLowerCase().includes('hello') || 
                message.toLowerCase().includes('hi')) {
                return fallbackResponses.greeting;
            } else {
                return fallbackResponses.error;
            }
        }
    }
    
    // Show quick reply buttons
    function showQuickReplies() {
        // Create quick replies container
        const quickRepliesDiv = document.createElement('div');
        quickRepliesDiv.classList.add('quick-replies');
        
        // Add quick reply buttons
        quickReplies.forEach(reply => {
            const button = document.createElement('button');
            button.classList.add('quick-reply-btn');
            button.textContent = reply.text;
            button.addEventListener('click', async function() {
                // Add user message
                addUserMessage(reply.text);
                
                // Show typing indicator
                showTypingIndicator();
                
                try {
                    // Generate bot response using AI
                    const response = await getBotResponse(reply.text);
                    hideTypingIndicator();
                    addBotMessage(response);
                } catch (error) {
                    hideTypingIndicator();
                    addBotMessage(fallbackResponses.error);
                    console.error('Error in quick reply:', error);
                }
                
                // Remove quick replies
                if (quickRepliesDiv.parentNode) {
                    quickRepliesDiv.remove();
                }
                
                // Show new quick replies after bot responds
                setTimeout(showQuickReplies, 1500);
            });
            
            quickRepliesDiv.appendChild(button);
        });
        
        // Add to messages container
        chatbotMessages.appendChild(quickRepliesDiv);
        scrollToBottom();
    }
    
    // Scroll chat to bottom
    function scrollToBottom() {
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }
    
    // Initialize chatbot if elements exist
    if (chatbotContainer) {
        initChatbot();
    }
});
