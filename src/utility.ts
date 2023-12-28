export async function retry(cb: Function, retries = 3, showError = false) {
    try { return await cb() }
    catch (e) {
        if (showError) console.log(e);
        if (retries) return await retry(cb, retries - 1)
    }
}