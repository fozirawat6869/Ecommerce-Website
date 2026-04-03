// debouncing function to optimize search input handling

export default function debounce(func,delay){
    let timeoutId; // to store the timeout ID for clearing previous timeouts
    return function(...args){
        clearTimeout(timeoutId) // clear the previous timeout to reset the delay

        timeoutId=setTimeout(()=>{ // set a new timeout to call the function after the specified delay
            func(...args)
        },delay)
    }
}