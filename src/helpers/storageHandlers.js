const storageName = 'notes'

const storageHandlers = {
    setStorage: notes => {
        localStorage.setItem(storageName, JSON.stringify(notes))
    },

    removeStorage: () => {
        localStorage.removeItem(storageName)
    },

    inStorage: () => {
        const data = JSON.parse(localStorage.getItem(storageName))
        return data
    }
}

export { storageHandlers }