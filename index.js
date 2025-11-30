import { tweetsData } from './data.js'
import { v4 as uuidv4 } from 'https://jspm.dev/uuid'





document.addEventListener("click", function(e){
    if(e.target.dataset.like){
        handleTweetLike(e.target.dataset.like)
    }else if(e.target.dataset.retweet){
        handleRetweet(e.target.dataset.retweet)
    }else if(e.target.dataset.reply){
        handleReplyTweet(e.target.dataset.reply)
    }else if(e.target.id ==='tweet-btn'){
        handleTweetBtnClick()
    }else if(e.target.dataset.btn){
        handleReplyBtnClick(e.target.dataset.btn)
    }else if(e.target.dataset.delete){
        handleDeleteBtn(e.target.dataset.delete)
    }

})



function handleTweetLike(uuidTweet){
    const tweetObject =  tweetsData.filter(function(tweet){
        return tweet.uuid === uuidTweet
    })[0]
    if (!tweetObject.isLiked){
          tweetObject.likes++
          
    }else{
        tweetObject.likes--
    }
    tweetObject.isLiked = !tweetObject.isLiked 
    render()
}




function handleRetweet(uuidTweet){
    const tweetObject =  tweetsData.filter(function(tweet){
        return tweet.uuid === uuidTweet
    })[0]
     if (!tweetObject.isRetweeted){
          tweetObject.retweets++

          
    }else{
        tweetObject.retweets--
    }
    tweetObject.isRetweeted  = !tweetObject.isRetweeted 
    render()
}



function handleReplyTweet(uuidTweet){
    document.getElementById(`${uuidTweet}`).classList.toggle('hidden')
}


function handleTweetBtnClick(){
    
    const tweetInput = document.getElementById('tweet-input')
    if(tweetInput.value){
        tweetsData.unshift({
            handle: `@Scrimba`,
            profilePic: `images/scrimbalogo.png`,
            likes: 0,
            retweets: 0,
            tweetText: tweetInput.value,
            replies: [],
            isLiked: false,
            isRetweeted: false,
            uuid: uuidv4()
        })
    render()
    tweetInput.value = ''
    }

}
function handleReplyBtnClick(uuidTweet){
    const tweetInput = document.getElementById(`reply-${uuidTweet}`)
    if(tweetInput.value){
        const tweetObject = tweetsData.filter(function(tweet){
            return tweet.uuid === uuidTweet
        })[0]

        tweetObject.replies.unshift({
            handle: `@Scrimba`,
            profilePic: `images/scrimbalogo.png`,
            tweetText: tweetInput.value
        })
    render()
    tweetInput.value = ''
    }


}

 function handleDeleteBtn(tweetId){
    
    
     const indexTweetToDelete = tweetsData.findIndex(function(tweet){
        return tweet.uuid === tweetId
     })
     tweetsData.splice(indexTweetToDelete,1)
     render()
    
     
 }












function getFeedHtml(){
    
    let htmlCode = ``
    tweetsData.forEach(function(tweet){
        let htmlReply= ``
        if (tweet.replies.length>=1)
        tweet.replies.forEach(function(reply){
            htmlReply += `
            <div class="tweet">
                <img src="${reply.profilePic}" alt="" class="profile-pic" />
                    <div class="tweet-inner">
                    <p class="handle">${reply.handle}</p>
                    <p class="tweet-text">
                        ${reply.tweetText}
                    </p>
             
                </div>

            </div>
        `

        })
        




        let ClassLike = ''
        let classRetweet = ''
        if (tweet.isLiked){
            ClassLike='isLiked'
        }
        if ( tweet.isRetweeted){
            classRetweet = 'isRetweeted'
        }
        htmlCode+= `
        <div class="tweet">
          <img src="${tweet.profilePic}" alt="" class="profile-pic" />
          <div class="tweet-inner">
            <p class="handle">${tweet.handle}</p>
            <p class="tweet-text">
              ${tweet.tweetText}
            </p>
            <div class="icons">
              <span>
                <i class="fa-regular fa-comment-dots" data-reply = "${tweet.uuid}"></i>
                ${tweet.replies.length}
              </span>
              <span>
                <i class="fa-solid fa-heart ${ClassLike}" data-like = "${tweet.uuid}"></i>
                ${tweet.likes}
              </span>
              <span>
                <i class="fa-solid fa-retweet ${classRetweet}" data-retweet = "${tweet.uuid}"></i>
                ${tweet.retweets}
              </span>
              <span>
                <i class="fa-solid fa-xmark" data-delete = "${tweet.uuid}"></i>
                delete
              </span>
            </div>
          </div>
        </div>

       <div class="left-space hidden" id="${tweet.uuid}">
            <div class="tweet-input-area tweet-reply-area">
                <img src="images/scrimbalogo.png" class="profile-pic" />
                <textarea placeholder="What do you think?" id="reply-${tweet.uuid}"></textarea>
                
            </div>
            <button data-btn ="${tweet.uuid}">Reply</button>
       
       
       
            ${htmlReply}
       
       </div>
      
        `
    })

    return htmlCode
}

function render(){
    document.getElementById('feed').innerHTML  =  getFeedHtml()
}
render()




