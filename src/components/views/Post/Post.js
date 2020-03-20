import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import { connect } from 'react-redux';
import { getPostById } from '../../../redux/postsRedux.js';
import { getUser } from '../../../redux/userRedux.js';

import styles from './Post.module.scss';

const Component = ({ className, post, user }) => (
  <div className={clsx(className, styles.root)}>
    <h2>Post</h2>
    {user.authenticated ? (<Button href={`/post/edit/${post.id}`} variant="dark">Edit post</Button>) : ''}
    <Card>
      <Card.Img variant="top" src={post.image} />
      <Card.Header>{post.title}</Card.Header>
      <Card.Subtitle className="mt-2 text-muted">{post.price}</Card.Subtitle>
      <Card.Body>
        <Card.Text>
          {post.content}
        </Card.Text>
        <ul className={styles.postDetailsList}>
          <li className={styles.postDetail}>
            <small>Location</small>
            <p>&nbsp;{post.location}</p>
          </li>
          <li className={styles.postDetail}>
            <small>Phone</small>
            <p>&nbsp;{post.phone}</p>
          </li>
          <li className={styles.postDetail}>
            <small>E-mail</small>
            <p>{post.email}</p>
          </li>
        </ul>
      </Card.Body>
      <Card.Footer>
        <small className="text-muted">Last update {post.updated}</small>
        <small className="text-muted">Published {post.published}</small>
      </Card.Footer>
    </Card>
  </div>
);

Component.propTypes = {
  className: PropTypes.string,
  post: PropTypes.object,
  user: PropTypes.object,

};

const mapStateToProps = (state, props) => ({
  post: getPostById(state, props.match.params.id),
  user: getUser(state),
});

// const mapDispatchToProps = dispatch => ({
//   someAction: arg => dispatch(reduxActionCreator(arg)),
// });

const Container = connect(mapStateToProps)(Component);

export {
  // Component as Post,
  Container as Post,
  Component as PostComponent,
};
