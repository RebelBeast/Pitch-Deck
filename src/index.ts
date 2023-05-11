document.addEventListener("DOMContentLoaded", () : void=>{
    const pitches : NodeListOf<HTMLDivElement> = document.querySelectorAll(".pitch")
    let textbox : NodeListOf<HTMLDivElement> = document.querySelectorAll(".textbox")
    pitches.forEach((b : HTMLDivElement) => {
        b.addEventListener("drop", handleDrop)
        b.addEventListener("dragover", (ev : DragEvent)=> {
            ev.preventDefault();
        })
    })
    update();
    const buttons : NodeListOf<HTMLButtonElement> | null = document.querySelectorAll(".btn-add")
    if (buttons !== null) {
        buttons.forEach((y : HTMLButtonElement) => {
            y.addEventListener('click' , addElement)
        })
    }
})


function update() {
    let textbox: NodeListOf<HTMLDivElement> = document.querySelectorAll(".textbox")
    textbox.forEach((i: HTMLDivElement) => {
        i.addEventListener("drag", (ev : DragEvent)=> {ev.preventDefault()})
        i.addEventListener("dragstart", handlePickUp)
    })
}


function handleDrop(this: HTMLDivElement, ev: DragEvent) {
    if (ev.dataTransfer !== null) {
        const itemtitle : string = ev.dataTransfer.getData("text/plain")
        let elem = document.createElement("div")
        elem.setAttribute("contentEditable", "true")
        elem.innerHTML = itemtitle
        elem.classList.add("textbox")
        elem.setAttribute("draggable", "true");
        let old : HTMLDivElement | null = document.querySelector(".dragged");
        if (old !== null && old.parentNode !== null) {
            old.parentNode.removeChild(old);
        }
        this.appendChild(elem);
        update();
    }
}


function handlePickUp(this: HTMLDivElement, ev: DragEvent) {
    if (ev.dataTransfer !== null) {
        ev.dataTransfer.setData("text/plain", this.innerHTML)
        ev.dataTransfer.dropEffect = "move"
        this.classList.add("dragged")
    }
}

function addElement(this: HTMLButtonElement) {
    let elem = document.createElement("div")
        elem.setAttribute("contentEditable", "true")
        elem.classList.add("textbox")
        elem.setAttribute("draggable", "true");
        let container : HTMLDivElement | null = this.parentNode as HTMLDivElement
        if (container !== null) {
            container = container.parentNode as HTMLDivElement
            container.appendChild(elem)
        }
        update()

}



