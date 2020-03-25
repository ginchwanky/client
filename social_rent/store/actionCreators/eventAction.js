import axiosInstance from '../../src/instances/axiosInstance'

const createEvent = (payload) => {
    axiosInstance
       .post('http://localhost:3000/events', payload)
       .then(({ data }) => {
          console.log('=== masuk createEvent')
       })
       .catch(console.log)
 }