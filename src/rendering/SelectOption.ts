class SelectOption {
    value: string;
    text: string;
    selected: boolean;
    disabled: boolean;

    constructor(value: string, text: string, selected?: boolean, disabled?: boolean)
    constructor(value: string, text: string, selected: boolean, disabled: boolean) {
        this.value = value;
        this.text = text;
        this.selected = selected === undefined ? false : true;
        this.disabled = disabled === undefined ? false: true;
    }
}

export default SelectOption;