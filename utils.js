module.exports = {
    age: function age(timestamp){
        const today = new Date()
        const birthDate = new Date(timestamp)
        const month = birthDate.getMonth()


        let age = today.getFullYear() -  birthDate.getFullYear()

        if(month <= 0 && today.getDate() < birthDate.getDate()) age -= 1

        return age
    },
    graduation: function graduation(degree){
        switch(degree){
            case 'hs':
                return 'High School'
            case 'bd':
                return 'Bachelors Degree'
            case 'md':
                return "Master's Degree"
            case 'dd':
                return 'Dectorate Degree'
            default:
                return 'Ungraduad'
        }
    },
    date: function date(timestamp){
        const date = new Date(timestamp)

        const year = date.getUTCFullYear()
        const month = `0${date.getUTCMonth()}`.slice(-2)
        const day = `0${date.getUTCDate()}`.slice(-2)
        
        return `${year}-${month}-${day}`
    }
}