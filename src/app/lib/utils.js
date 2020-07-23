module.exports = {
    age: function age(timestamp){
        const today = new Date()
        const birthDate = new Date(timestamp)
        const month = today.getMonth() - birthDate.getMonth()


        let age = today.getFullYear() -  birthDate.getFullYear()

        if(month < 0 || month == 0 && today.getDate() < birthDate.getDate()){
            age -= 1
        }
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
        const month = `0${Number(date.getUTCMonth() + 1 )}`.slice(-2)
        const day = `0${date.getUTCDate()}`.slice(-2)
        
        return {
            day,
            month,
            year,
            iso: `${year}-${month}-${day}`,
        birthDay: `${day}/${month}`,
        format: `${month}/${year}`
    }
    
    },
    grade: function(grade){
        switch(grade){
            case '5':
                return '5th grade middle school'
            case '6':
                return '6th grade middle school'
            case '7':
                return "7th grade middle school"
            case '8':
                return '8th grade middle school'
            case '9':
                return '1st grade High school'
            case '10':
                return "2nd grade Hight School"
            case '11':
                return '3rd grade Hight School'
            default:
                return 'Ungraduad'
        }
    }
}