
// Sleep function
export const sleep = (s: number) => new Promise(resolve => setTimeout(resolve, s * 1000));

// Debounce function
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const debounce = <T extends (...args: any[]) => void>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => func(...args), delay)
  }
}

export const copyToClipboard = async (text: string, onSuccess?:()=>void, onError?:()=>void) => {
  try {
    await navigator.clipboard.writeText(text);
    if(onSuccess) onSuccess()
  } catch (err) {
    if(onError) onError()
    console.error('Failed to copy: ', err);
  }
}