export class User {
    firstName: string;
    lastName: string;
    gender: string;
    eMail: string;
    birthDate: number;
    street: string;
    zipCode: number;
    city: string;
    category: string;

    constructor(obj?: any) {
        this.firstName = obj ? obj.firstName : '';
        this.lastName = obj ? obj.lastName : '';
        this.gender = obj ? obj.gender : '';
        this.eMail = obj ? obj.eMail : '';
        this.birthDate = obj ? obj.birthDate : '';
        this.street = obj ? obj.street : '';
        this.zipCode = obj ? obj.zipCode : '';
        this.city = obj ? obj.city : '';
        this.category = obj ? obj.category : '';
    }

    public toJSON() {
        return {
            firstName: this.firstName,
            lastName: this.lastName,
            gender: this.gender,
            eMail: this.eMail,
            birthDate: this.birthDate,
            street: this.street,
            zipCode: this.zipCode,
            city: this.city,
            category: this.category
        }
    }
}