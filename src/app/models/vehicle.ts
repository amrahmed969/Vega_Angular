export interface KayValuePair {
    id: number
    name: string
}
export interface Contact {
    name: string;
    phone: string;
    email: string;

}

export interface Vehicle {
    id: number;
    model: KayValuePair;
    make: KayValuePair;
    isRegistered: boolean;
    features: KayValuePair[];
    contact: Contact;
    lastUpdated: string
}
export interface SaveVehicle {
    id: number;
    modelId: number;
    makeId: number;
    isRegistered: boolean;
    features: number[];
    contact: Contact;
}