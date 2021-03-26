export function calculateCost(storage) {
    let rate = 1;
    if (storage <= 10) {
        rate = 4;
    } else if (storage <= 100) {
        rate = 2;
    }

    return rate * storage * 100;
}