import rp from 'request-promise'

export function getPostById(id){
    rp(`https://jsonplaceholder.typicode.com/posts/${id}`)
        .then(console.log)
}

export function capatalizeWords(sentance){
    console.log('hi')
    return sentance
        .split(' ')
        .map(
            words => words[0].toUpperCase() + words.slice(1, words.length)
        )
        .join(' ')
        
}

export function getPostsCommentsById(id){
    return rp(`https://jsonplaceholder.typicode.com/comments?postId=${id}`)
    .then(JSON.parse)
}

export function makeGetPostsCommentsById({rp: rp, raven}){
    return (id) => 
        rp(`https://jsonplaceholder.typicode.com/comments?postId=${id}`)
            .then(JSON.parse)
            .then(result => {
                raven.captureMessage(result)
                return result
            })
}

export function makeFailGetPostsCommentsById({rp: rp}){
    return (id) => 
        rp(`https://jsonplaceholder.typicode.com/commzents?postId=${id}`)
            .then(JSON.parse)
            
}

export default {
    getPostById,
    capatalizeWords,
    getPostsCommentsById,
    makeGetPostsCommentsById,
    makeFailGetPostsCommentsById
}