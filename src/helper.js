export function toCelsius(temp) {
    let celsiusTemp = ((temp - 32) * 5) / 9
    return celsiusTemp.toFixed(0)
}

export function getLocation(input) {
    return input.value
}

export function clear(el) {
    el.innerHTML = ''
}