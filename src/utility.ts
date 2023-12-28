type RetryOptions = { onSuccess?: Function | null, retries?: number, showError?: boolean }

export async function retry(cb: Function, { onSuccess = null, retries = 3, showError = false }: RetryOptions = {}) {
    try {
        const result = await cb()
        await onSuccess?.(result)
        return result
    }
    catch (e) {
        if (showError) console.log(e);
        if (retries) return await retry(cb, { onSuccess, retries: retries - 1, showError })
    }
}