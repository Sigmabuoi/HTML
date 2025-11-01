document.addEventListener('DOMContentLoaded', () => {
    const presentBox = document.getElementById('presentBox');
    const messageCard = document.getElementById('messageCard');
    const canvas = document.getElementById('birthdayCanvas');
    const ctx = canvas.getContext('2d');

    // Thiết lập kích thước canvas
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // 1. Xử lý sự kiện click Hộp quà
    presentBox.addEventListener('click', () => {
        // Ẩn hộp quà
        presentBox.style.display = 'none';
        
        // Hiển thị và tạo hiệu ứng cho thẻ lời chúc
        messageCard.classList.remove('hidden');
        // Cho một khoảng trễ nhỏ để hiệu ứng "mở" được mượt
        setTimeout(() => {
            messageCard.classList.add('visible');
        }, 10); 
        
        // Bắt đầu hiệu ứng pháo hoa
        startFireworks();
    });

    // 2. Hàm tạo hiệu ứng Pháo hoa cơ bản (sử dụng Canvas)

    const particles = [];
    const NUM_PARTICLES = 100;
    const COLORS = ['#ffc0cb', '#add8e6', '#fffacd', '#98fb98', '#ffb6c1']; // Màu Pastel

    function Particle(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.radius = Math.random() * 2 + 1;
        this.velocity = {
            x: (Math.random() - 0.5) * 5,
            y: (Math.random() - 0.5) * 5
        };
        this.alpha = 1;
        this.friction = 0.98;
        this.gravity = 0.1;
    }

    Particle.prototype.update = function() {
        this.velocity.x *= this.friction;
        this.velocity.y *= this.friction;
        this.velocity.y += this.gravity;
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        this.alpha -= 0.01;
    };

    Particle.prototype.draw = function() {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.restore();
    };

    function createFirework(x, y) {
        for (let i = 0; i < NUM_PARTICLES; i++) {
            particles.push(new Particle(x, y, COLORS[Math.floor(Math.random() * COLORS.length)]));
        }
    }

    function animate() {
        requestAnimationFrame(animate);
        // Làm mờ nhẹ canvas để tạo hiệu ứng vệt mờ (trail)
        ctx.fillStyle = 'rgba(255, 228, 225, 0.1)'; // Màu nền Pastel của body
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();
            if (particles[i].alpha <= 0) {
                particles.splice(i, 1);
                i--;
            }
        }
    }
    
    // Bắt đầu vòng lặp animation
    animate();

    // Hàm gọi pháo hoa ngẫu nhiên
    function startFireworks() {
        // Tạo 3 chùm pháo hoa ngẫu nhiên
        for (let i = 0; i < 3; i++) {
            const randomX = Math.random() * canvas.width;
            const randomY = Math.random() * canvas.height * 0.7; // Tập trung ở phía trên
            createFirework(randomX, randomY);
        }
        
        // Tiếp tục tạo pháo hoa sau mỗi 1-2 giây
        setTimeout(startFireworks, Math.random() * 1500 + 1000); 
    }
});