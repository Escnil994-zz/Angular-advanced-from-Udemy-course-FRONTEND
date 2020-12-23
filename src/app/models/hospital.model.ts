
interface _HospitalUserInterface {
    uid: string,
    name: string,
    image: string
}

export class Hospital {

    constructor(
        public name: string,
        public uid?: string,
        public image?: string,
        public user?: _HospitalUserInterface
    ) {
    }
}