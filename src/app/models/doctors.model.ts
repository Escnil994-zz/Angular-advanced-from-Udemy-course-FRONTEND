
interface _UserInterface {
    uid: string,
    name: string,
    image: string
}

interface _HospitalInterface {
    uid: string,
    name: string,
    image: string
}

export class Doctor {

    constructor(
        public name: string,
        public uid?: string,
        public image?: string,
        public user?: _UserInterface,
        public hospital?: _HospitalInterface
    ) {
    }
}