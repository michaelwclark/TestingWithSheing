import app from './index'

describe('capatalizeWords', () => {
    it('should return a string', ()=>{
        const result =   app.capatalizeWords('balwherlw')
        expect(typeof result).toBe('string')
    })
})

describe('getPostsCommentsById', ()=>{
    it('should return a promise that contains an array of coments', (done)=>{
        app.getPostsCommentsById(1)
            .then(comments => {
                expect(comments).toBeInstanceOf(Array)
                done()
            })
    })
})

describe('makeGetPostsCommentsById', ()=>{
    it('should return a function',()=>{
        const mock_services = {rp: ()=>{}}
        const result = app.makeGetPostsCommentsById(mock_services)
        expect(typeof result).toBe('function')
    })

    it('should call rp with url and id and log results', (done)=>{
        let rpWasCalled = false
        let ravenWasCalled = false
        let mock_id = 1
        const mock_services = {
            rp: (url) => {
                rpWasCalled = true
                expect(url).toBe(`https://jsonplaceholder.typicode.com/comments?postId=${mock_id}`)
                return Promise.resolve(JSON.stringify(['hullo']))
            },
            raven: {
                captureMessage: (mock_results) =>{
                    ravenWasCalled = true
                    expect(mock_results).toEqual(['hullo'])
                }
            }
        }
        const getPostsCommentById = app.makeGetPostsCommentsById(mock_services)
        getPostsCommentById(mock_id)
            .then(result =>{

                expect(ravenWasCalled).toBeTruthy()
                expect(rpWasCalled).toBeTruthy()
                done()
            })

    })

})


describe('makeFailGetPostsCommentsById', ()=>{
    it('should return a function',()=>{
        const mock_services = {rp: ()=>{}}
        const result = app.makeFailGetPostsCommentsById(mock_services)
        expect(typeof result).toBe('function')
    })

    it('should call rp with url and id', (done)=>{
        let rpWasCalled = false
        let mock_id = 1
        const mock_services = {
            rp: (url) => {
                rpWasCalled = true
                expect(url).toBe(`https://jsonplaceholder.typicode.com/commzents?postId=${mock_id}`)
                return Promise.resolve(JSON.stringify(['hullo']))
            }
        }
        const getPostsCommentById = app.makeFailGetPostsCommentsById(mock_services)
        getPostsCommentById(mock_id)
            .then(result =>{
                console.log(result)
                done()
                expect(rpWasCalled).toBeTruthy()
            })
    })

    it('should throw error 404 when api returns error', (done)=>{
        let rpWasCalled = false
        let mock_id = 1
        const mock_services = {
            rp: (url) => {
                rpWasCalled = true
                expect(url).toBe(`https://jsonplaceholder.typicode.com/commzents?postId=${mock_id}`)
                return Promise.reject({statusCode:404})
            }
        }
        const getPostsCommentById = app.makeFailGetPostsCommentsById(mock_services)
        getPostsCommentById(mock_id)
            .catch(error =>{
                console.log(error.statusCode)
                expect(error.statusCode).toBe(404)
                done()
            })
    })


})