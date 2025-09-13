/* ========================================
   Blog Page - Interactive JavaScript
   ======================================== */

document.addEventListener('DOMContentLoaded', function() {
    initBlogFilters();
    initLoadMore();
});

/* ========================================
   Blog Category Filters
   ======================================== */
function initBlogFilters() {
    const filterButtons = document.querySelectorAll('.category-filter');
    const blogPosts = document.querySelectorAll('.blog-post');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            const filterValue = button.getAttribute('data-category');
            
            blogPosts.forEach(post => {
                const postCategory = post.getAttribute('data-category');
                
                if (filterValue === 'all' || postCategory === filterValue) {
                    showPost(post);
                } else {
                    hidePost(post);
                }
            });
            
            // Update load more button visibility
            updateLoadMoreVisibility();
        });
    });
}

function showPost(post) {
    post.style.display = 'block';
    post.style.opacity = '0';
    post.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        post.style.transition = 'all 0.3s ease';
        post.style.opacity = '1';
        post.style.transform = 'translateY(0)';
    }, 50);
}

function hidePost(post) {
    post.style.transition = 'all 0.3s ease';
    post.style.opacity = '0';
    post.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        post.style.display = 'none';
    }, 300);
}

/* ========================================
   Load More Functionality
   ======================================== */
function initLoadMore() {
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', loadMorePosts);
    }
}

function loadMorePosts() {
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    const postsGrid = document.querySelector('.posts-grid');
    
    // Show loading state
    const originalText = loadMoreBtn.textContent;
    loadMoreBtn.textContent = 'Loading...';
    loadMoreBtn.disabled = true;
    
    // Simulate loading more posts (replace with actual API call)
    setTimeout(() => {
        const newPosts = generateMorePosts();
        
        newPosts.forEach(post => {
            postsGrid.appendChild(post);
            
            // Animate in the new post
            setTimeout(() => {
                post.style.opacity = '1';
                post.style.transform = 'translateY(0)';
            }, 100);
        });
        
        // Reset button
        loadMoreBtn.textContent = originalText;
        loadMoreBtn.disabled = false;
        
        // Hide load more button if no more posts
        // This is just for demo - in real implementation, check if more posts available
        loadMoreBtn.style.display = 'none';
        
    }, 1000);
}

function generateMorePosts() {
    const morePosts = [
        {
            category: 'design',
            image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
            date: 'November 20, 2024',
            readTime: '5 min read',
            title: 'Typography Trends in Modern Design',
            excerpt: 'Explore the latest typography trends and how they\'re shaping modern design aesthetics.',
            author: {
                image: 'https://images.unsplash.com/photo-1494790108755-2616c395d3e8?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
                name: 'Sarah Mitchell'
            }
        },
        {
            category: 'tips',
            image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
            date: 'November 18, 2024',
            readTime: '3 min read',
            title: 'Quick Photoshop Tips for Designers',
            excerpt: 'Master these essential Photoshop shortcuts and techniques to speed up your workflow.',
            author: {
                image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
                name: 'David Kumar'
            }
        }
    ];
    
    return morePosts.map(postData => createPostElement(postData));
}

function createPostElement(postData) {
    const article = document.createElement('article');
    article.className = 'blog-post';
    article.setAttribute('data-category', postData.category);
    article.style.opacity = '0';
    article.style.transform = 'translateY(20px)';
    article.style.transition = 'all 0.3s ease';
    
    article.innerHTML = `
        <div class="post-image">
            <img src="${postData.image}" alt="${postData.title}" />
            <div class="post-category">${capitalizeFirstLetter(postData.category)}</div>
        </div>
        <div class="post-content">
            <div class="post-meta">
                <span class="date">${postData.date}</span>
                <span class="read-time">${postData.readTime}</span>
            </div>
            <h3>${postData.title}</h3>
            <p>${postData.excerpt}</p>
            <div class="post-footer">
                <div class="author-small">
                    <img src="${postData.author.image}" alt="${postData.author.name}" />
                    <span>${postData.author.name}</span>
                </div>
                <a href="#" class="read-more">Read More <i class="fas fa-arrow-right"></i></a>
            </div>
        </div>
    `;
    
    return article;
}

function updateLoadMoreVisibility() {
    const visiblePosts = document.querySelectorAll('.blog-post[style*="block"], .blog-post:not([style*="none"])');
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    
    // Show/hide load more button based on visible posts
    if (visiblePosts.length < 6) {
        loadMoreBtn.style.display = 'none';
    } else {
        loadMoreBtn.style.display = 'inline-block';
    }
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

/* ========================================
   Blog Search Functionality (Future Enhancement)
   ======================================== */
function initBlogSearch() {
    const searchInput = document.getElementById('blogSearch');
    
    if (searchInput) {
        let searchTimeout;
        
        searchInput.addEventListener('input', function(e) {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                const searchTerm = e.target.value.toLowerCase();
                filterPostsBySearch(searchTerm);
            }, 300);
        });
    }
}

function filterPostsBySearch(searchTerm) {
    const blogPosts = document.querySelectorAll('.blog-post');
    
    blogPosts.forEach(post => {
        const title = post.querySelector('h3').textContent.toLowerCase();
        const excerpt = post.querySelector('p').textContent.toLowerCase();
        const category = post.getAttribute('data-category').toLowerCase();
        
        if (title.includes(searchTerm) || excerpt.includes(searchTerm) || category.includes(searchTerm)) {
            showPost(post);
        } else {
            hidePost(post);
        }
    });
}

/* ========================================
   Reading Progress Bar (Future Enhancement)
   ======================================== */
function initReadingProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'reading-progress';
    progressBar.innerHTML = '<div class="reading-progress-fill"></div>';
    
    const progressFill = progressBar.querySelector('.reading-progress-fill');
    
    // Add styles
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 3px;
        background-color: rgba(0, 0, 0, 0.1);
        z-index: 9999;
    `;
    
    progressFill.style.cssText = `
        height: 100%;
        background-color: var(--primary-color);
        width: 0%;
        transition: width 0.1s ease;
    `;
    
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const maxHeight = document.body.scrollHeight - window.innerHeight;
        const progress = (scrolled / maxHeight) * 100;
        
        progressFill.style.width = `${Math.min(progress, 100)}%`;
    });
}

/* ========================================
   Social Sharing (Future Enhancement)
   ======================================== */
function addSocialSharing() {
    const posts = document.querySelectorAll('.blog-post');
    
    posts.forEach(post => {
        const shareButtons = document.createElement('div');
        shareButtons.className = 'social-share';
        shareButtons.innerHTML = `
            <button class="share-btn share-twitter" data-platform="twitter">
                <i class="fab fa-twitter"></i>
            </button>
            <button class="share-btn share-facebook" data-platform="facebook">
                <i class="fab fa-facebook"></i>
            </button>
            <button class="share-btn share-linkedin" data-platform="linkedin">
                <i class="fab fa-linkedin"></i>
            </button>
        `;
        
        const postContent = post.querySelector('.post-content');
        postContent.appendChild(shareButtons);
        
        // Add event listeners for sharing
        shareButtons.addEventListener('click', handleSocialShare);
    });
}

function handleSocialShare(e) {
    if (!e.target.closest('.share-btn')) return;
    
    const platform = e.target.closest('.share-btn').getAttribute('data-platform');
    const post = e.target.closest('.blog-post');
    const title = post.querySelector('h3').textContent;
    const url = window.location.href;
    
    let shareUrl = '';
    
    switch (platform) {
        case 'twitter':
            shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;
            break;
        case 'facebook':
            shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
            break;
        case 'linkedin':
            shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
            break;
    }
    
    if (shareUrl) {
        window.open(shareUrl, '_blank', 'width=600,height=400');
    }
}

/* ========================================
   Initialize Enhanced Features
   ======================================== */
// Uncomment these to enable additional features
// document.addEventListener('DOMContentLoaded', function() {
//     initBlogSearch();
//     initReadingProgress();
//     addSocialSharing();
// });