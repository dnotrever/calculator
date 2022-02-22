const calculator = {

    equation: [],

    logics: {
        modifier: null,
        point_verify: null,
        eq_continuat: true,
    },

    display_top: document.querySelector('.display-top'),
    display_bot: document.querySelector('.display-bot'),

    showConsole () {
        console.clear()
        console.log(this.equation)
        console.log(this.equation.toString().replaceAll(',', ''))
    },

    init() {

        this.equation = []

        console.clear()

        this.logics.modifier = false
        this.logics.point_verify = false
        this.logics.eq_continuation = false

        this.display_top.innerHTML = ''
        this.display_bot.innerHTML = '0'

        this.showConsole()
        
    },

    number(num) {

        if (this.logics.eq_continuation === true) {
            this.equation = []
            this.display_top.innerHTML = ''
            this.display_bot.innerHTML = ''
        }

        this.logics.modifier = true
        this.logics.eq_continuation = false


        this.equation.push(num)

        if (this.display_bot.innerHTML === '0') {
            this.display_bot.innerHTML = ''
        }

        this.display_bot.innerHTML += num

        this.showConsole()

    },

    decimal() {

        if (this.logics.point_verify === false && 
            this.logics.modifier === true) {

            this.logics.modifier = false
            this.logics.point_verify = true
            this.logics.eq_continuation = false

            this.equation.push('.')

            this.display_bot.innerHTML += ','

            this.showConsole()
        }

    },

    operation(sign, type=0) {

        if (this.logics.modifier === true &&
            this.equation.length !== 0) {

            this.display_top.innerHTML = ''

            this.logics.modifier = false
            this.logics.point_verify = false
            this.logics.eq_continuation = false

            this.equation.push(sign)

            if (type !== 0) {
                this.display_bot.innerHTML += type
            } else {
                this.display_bot.innerHTML += sign
            }

            this.showConsole()
        }

    },

    backspace() {

        if (this.equation.length !== 0) {

            this.display_top.innerHTML = ''

            this.equation.pop()

            this.display_bot.innerHTML = this.equation.toString().replaceAll(',', '').replace('.', ',')

            if (this.equation.length === 0) {
                this.display_bot.innerHTML = '0'
            }

            this.showConsole()
        }

    },

    squared() {

        const eq_format = this.equation.toString().replaceAll(',', '')

        if (!isNaN(eq_format)) {
            const squared = eq_format ** 2

            this.display_top.innerHTML = this.display_bot.innerText + '²'
            this.display_bot.innerHTML = squared

            this.logics.eq_continuation = true
            
            this.equation = []
            this.equation.push(squared)

            this.showConsole()
        }

    },

    percent() {

        if (this.logics.modifier === true &&
            !this.equation.includes('/')) {
            this.equation.push('/')
            this.display_bot.innerHTML += '%'
        }

        this.showConsole()

    },

    result() {

        if (this.logics.modifier === true) {
            const eq_format = this.equation.toString().replaceAll(',', '')
            const result = (eval(eq_format)).toString()

            this.display_top.innerHTML = this.display_bot.innerText
            this.display_bot.innerHTML = result.replace('.', ',')

            this.logics.eq_continuation = true
            
            this.equation = []
            this.equation.push(result)

            // this.showConsole()

            console.log('Result: ', result)
        }

    },

}   