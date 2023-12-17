(function ($) {
    let favTagsList = $('#fav-tags'),
        globalTagsList = $('#global-fav-tags'),
        follower_count = $('#follower_count')[0],
        following_count = $('#following_count')[0],
        userId = $('#userId')[0].innerText

    

    $.ajax({
        url: `/user/followers/${userId}`,
        type: 'GET',
        success: function (followers) {
            console.log(followers)
            follower_count.innerText = followers.length
        },
        error: function (e) {
            console.error(e);
        }
    });

    $.ajax({
        url: `/user/following/${userId}`,
        type: 'GET',
        success: function (following) {
            following_count.innerText = following.length
        },
        error: function (e) {
            console.error(e);
        }
    });

    $.ajax({
        url: `/tags/popular`,
        type: 'GET',
        success: function (tags) {
            for (let i=0; i<tags.length; i++) { 
                favTagsList.append(`<li><a>${tags[i].tagString}</a></li>`)
            }
        },
        error: function (e) {
            console.error(e);
        }
    });

    $.ajax({
        url: `/user/${userId}/favorite-tags`,
        type: 'GET',
        success: function (tags) {
            for (let i=0; i<tags.length; i++) { 
                $.ajax({
                    url: `/tags/${tags[i]}`,
                    type: 'GET',
                    success: function (tag) {
                        globalTagsList.append(`<li><a>${tag.tagString}</a></li>`)
                    },
                    error: function (e) {
                        console.log(e);
                    }
                });
                
            }
        },
        error: function (e) {
            console.error(e);
        }
    });
}(window.jQuery))