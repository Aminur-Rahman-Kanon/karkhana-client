import React, { Component } from 'react'

class ErrorBoundary extends Component {
    constructor(props){
        super(props);
        this.state = { hasError: false }
    }

    //this method detect if there is any error and update the local state
    static getDerivedStateFromError(error) {
        return { hasError: true }
    }

    //this method invoked when any error detected during the lifycycle. Since we dont any have logging service
    //so we leave it empty for now
    componentDidCatch(error, info) {
        // console.log(error);
    }

    render() {
        if (this.state.hasError) {
            return this.props.fallbackUI;
        }

        return this.props.children;
    }
}

export default ErrorBoundary
