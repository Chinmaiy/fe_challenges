import React from 'react';

class ImageCard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            rowsSpan: 0
        };
        this.imageRef = React.createRef();
    }

    componentDidMount() {
        this.imageRef.current.addEventListener('load', this.setSpanRowEnd);
    }

    setSpanRowEnd = () => {
        const height = this.imageRef.current.clientHeight;

        const rowsSpan = Math.ceil(height / 10 + 1);

        this.setState({ rowsSpan });
    }

    render() {
        const { description, urls } = this.props.image;
        return (
            <div className="image-card" style={ { gridRowEnd: `span ${this.state.rowsSpan}` } }>
                <img ref={this.imageRef} src={urls.regular} alt={description} />
            </div>
        );
    }
};

export default ImageCard;