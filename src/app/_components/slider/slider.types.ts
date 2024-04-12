export type SliderProps={
    delay:number,
    slides:Slide[],

}

export type Slide={
    name:string,
    role:string,
    comment:string,
    profileImageUrl?:string
}