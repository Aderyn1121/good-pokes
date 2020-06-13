import React, { Component } from 'react';
import { backendUrl } from '../utils';
import { connect } from 'react-redux';


class CommentsDiv extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: this.props.id,
            newComment: ''
        }
        this.postComment = this.postComment.bind(this);
        this.handleForm = this.handleForm.bind(this);
    }

    componentDidMount() {
        this.loadComments();
        console.log(this.state.comments);
    }

    async loadComments() {
        const res = await fetch(`${backendUrl}/reviews/${this.state.id}`,
            { headers: { 'Authorization': `Bearer ${this.props.token}`, 'Content-Type': 'application/json', } })

        if (res.ok) {
            const commentsObj = await res.json();
            const comments = commentsObj.comments;
            this.setState({ comments })
        }
    }

    handleForm(e) {
        this.setState({ newComment: e.target.value });
    }


    async postComment(e) {
        e.preventDefault();
        const content = this.state.newComment;

        const res = await fetch(`${backendUrl}/reviews/${this.props.userId}/${this.props.id}`, {
            method: 'POST',

            headers: { 'Authorization': `Bearer ${this.props.token}`, 'Content-Type': 'application/json', },
            body: JSON.stringify({ content })
        })

        if (res.ok) {
            this.loadComments()
        }
    }

    async deleteComment(id) {
        // e.preventDefault();

        const res = await fetch(`${backendUrl}/reviews/${id}/delete`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${this.props.token}` }
        })

        if (res.ok) {
            this.loadComments()
        }
    }


    render() {
        if (!this.state.comments) return null;

        return (
            <div className="ui comments">
                <ul>
                    {this.state.comments.map((comment, i) => {
                        let id = comment.id;
                        return (
                            <div key={i}>
                                <span>
                                    <div>
                                        <p>{`From ${comment.userName}`}</p>
                                        <div>{comment.content}</div>
                                    </div>
                                    <button className='mini ui red button' onClick={() => this.deleteComment(id)}>Delete Comment</button>
                                </span>

                            </div>
                        )
                    })}
                </ul>

                <form onSubmit={this.postComment}>
                    <input type='textarea' placeholder='Post a comment!' onChange={this.handleForm} value={this.state.newComment}></input>
                    <button className='tiny ui secondary button' type='submit'>Post</button>
                </form>

            </div >
        )
    }



}


const mapStateToProps = state => {
    return {
        userId: state.authentication.userId,
        token: state.authentication.token
    };
};


export default connect(
    mapStateToProps,
    null
)(
    CommentsDiv
);
