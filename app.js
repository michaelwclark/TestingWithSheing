import app from './index'
import rp from 'request-promise'
import Raven from 'raven'

Raven.config('RAVEN_DSN').install();

const app_services = {
    rp,
    raven: Raven
}

const getPostsCommentsById = app.makeGetPostsCommentsById(app_services)
const failGetPostsCommentsById = app.makeFailGetPostsCommentsById(app_services)


getPostsCommentsById(100)
    .then(console.log)

// failGetPostsCommentsById(1000000)
//     .then(result => console.log('my results are:', result)) //wont get here..
//     .catch(err => console.error('OHNOES', err.statusCode))