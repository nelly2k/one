import * as React from "react";

interface EditableProps {
    value?: string;
    isEdit?: boolean;
    placeHolder?: string;
    isRequired?: boolean;
    onCommit?: (value?: string) => void;
    onFail?:()=>void;
}

interface EditableState {
    isEdit: boolean;
    value?: string;
    errorMessage?: string;
}
const defaultState = {
    isEdit: false,
    value: ""
} as EditableState;

export class Editable extends React.Component<EditableProps, EditableState>{
    state = defaultState;
    input: HTMLInputElement | null = null;

    componentWillMount() {
        this.setState({ value: this.props.value, isEdit: this.props.isEdit || false });
    }

    componentWillReceiveProps(next: EditableState) {
        if (next.value == this.state.value) {
            return;
        }
        this.setState({ value: next.value });
    }

    edit = async () => {
        await this.setState({ isEdit: true })
        if (this.input) {
            this.input.select();
        }
    }

    change = (newValue: string) => {
        this.setState({ value: newValue })
    }

    commit = () => {
        if (this.props.isRequired && !this.state.value) {
            this.setState({ errorMessage: "Please type something" });
            return;
        } else {
            this.setState({ errorMessage: "" })
        }
        this.setState({ isEdit: false });
        if (this.state.value == this.props.value) {
            return;
        }
        if (this.props.onCommit) {
            this.props.onCommit(this.state.value);
        }
    }

    keyUp = (keyCode: number) => {
        switch (keyCode) {
            case 13:
                this.commit();
                break;
            case 27:

                this.setState({value: this.props.value,isEdit: false})
                if (this.props.isRequired && this.props.value == "") {
                    if (this.props.onFail){
                        this.props.onFail();
                    }
                    
                }else{
                    this.setState({errorMessage:""})
                }
    
                break;
        }
    }

    render() {
        return <span className="editable">
            {!this.state.isEdit && <span className="text" onClick={this.edit}>{this.state.value}</span>}
            {this.state.isEdit && <input ref={(input) => this.input = input}
                value={this.state.value}
                onBlur={this.commit}
                onKeyUp={x => this.keyUp(x.keyCode)}
                onChange={x => this.change(x.target.value)} />}
            {this.state.errorMessage && <span className="error">{this.state.errorMessage}</span>}
        </span>
    }
}