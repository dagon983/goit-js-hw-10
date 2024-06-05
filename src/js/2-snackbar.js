import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector(".form");


// const promise = new Promise ((resolve, reject) => {
//     resolve(``)
// })

form.addEventListener("submit", (event) => {
    event.preventDefault();
    const formElements = event.currentTarget.elements;
    const state = formElements.state.value;
    const delay = formElements.delay.value;
    const promise = new Promise ((resolve, reject) => {
        if (state === "fulfilled") {
            resolve(`Fulfilled promise in ${delay} ms`)
        } else {
            reject(`Rejected promise in ${delay} ms`)
        }
    })
    promise
        .then(value => {
            setTimeout(() =>{
                iziToast.success({
                    message: `${value}`,
                    position: "topRight"
                });  
            }, delay)
            })

        .catch(error => {
            setTimeout(() =>{
                iziToast.error({
                    message: `${error}`,
                    position: "topRight"
                });  
              }, delay)
        });
    form.reset();
    
})

