class FormSubmit {
    constructor(settings){
        this.settings = settings;
        this.form = document.querySelector(settings.form);
        this.formButton = document.querySelector(settings.button);
        if (this.form){
            this.url = this.form.getAttribute("action");
        }
    }   
    displaySucess(){
        this.form.innerHTML = this.settings.sucess;

    }
    displayError(){
        this.form.innerHTML = this.settings.error;
    }
    getFormObject(){
        const formObject = {};
        const fields = this.form.querySelectorAll("[name]");
        fields.formEach((field) => {
            formObject[field.getAttribute("name")] = field.value;

        });
        return formObject;
    }
    async sendForm(){
        try{
            await fetch(this.url, {
                method: "POST",
                headers:{
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify(this.getFormObject()),

            });
            this.displaySucess();
        }catch(error){
            this.displayError();
            throw new Error(error);
        }
    }
    init(){
        if (this.form) this.formButton.addEventListener("click", () => this.displaySucess());
        return this;
    }
    
}
const formSubmit = new FormSubmit({
    form: "[data-form]",
    button: "[data-button]",
    sucess: "<h1 class='sucess'>Mensagem Enviada!</h1>",
    error: "<h1 class='error'>Não foi possível enviar a sua mensagem.</h1>",
});
formSubmit.init();