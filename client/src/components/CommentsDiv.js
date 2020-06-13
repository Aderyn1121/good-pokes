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

                {this.state.comments.map((comment, i) => {
                    let id = comment.id;
                    return (
                        <div className='comment' key={i}>

                            <div style={{ display: 'flex', flexDirection: 'column', alignContent: 'space-between', boxSizing: 'border-box', padding: '10px 10px', border: 'darkgreen solid 1px', borderRadius: '10px', boxShadow: '12px 11px 9px 1px rgba(18,74,13,1)', backgroundColor: 'whitesmoke' }}>
                                <p className='author' style={{ fontSize: '15px' }}>{`From ${comment.userName}`}</p>
                                <div className='content' style={{ color: 'black', padding: '10px', marginBottom: '10px', marginLeft: '15px', fontSize: '20px' }}>{comment.content}</div>
                                <button className='tiny red ui button' onClick={() => this.deleteComment(id)}>Delete Comment</button>
                            </div>



                        </div>
                    )
                })}


                <form className='ui reply form' onSubmit={this.postComment}>
                    <div className='field' style={{ boxSizing: 'border-box', padding: '10px 10px', border: 'darkgreen solid 1px', borderRadius: '10px', boxShadow: '12px 11px 9px 1px rgba(18,74,13,1)', backgroundColor: 'whitesmoke' }}>
                        <textarea type='text' placeholder='Post a comment!' onChange={this.handleForm} value={this.state.newComment}></textarea>
                        <button className='ui blue fluid labeled submit icon button' type='submit'>Post</button>
                    </div>
                </form>

            </div>

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
