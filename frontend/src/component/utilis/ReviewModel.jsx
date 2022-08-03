import React, { useState, useEffect, Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { RateReviewOutlined, TurnedIn } from '@material-ui/icons';
import ButtonMat from '../../generalComponent/ButtonMat';
import Rating from '@material-ui/lab/Rating';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { userAddReview } from '../../redux/actions/reviewAction';
const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

const ReviewModel = ({ item }) => {
  //*try remove error
  const nodeRef = React.useRef(null);
  //*try remove error
  const { loading, reviews } = useSelector((state) => state.review);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  //*Handle review
  const [value, setValue] = useState(0);
  const [comment, setComment] = useState('');
  const submitReview = (id) => {
    if (comment.length <= 3)
      return toast.error('comment must be at least 4 characters');
    if (value <= 0) return toast.error('Please Rate the product');
    console.log('start', value);
    console.log('comment', comment);
    console.log('id', id);
    const obj = {
      product: id,
      comment: comment,
      rating: value,
    };
    dispatch(userAddReview(obj));

    setValue(0);
    setComment('');
    setOpen(false);
  };
  return (
    <div noderef={nodeRef}>
      <ButtonMat
        name="Review"
        //    icon={<RateReviewOutlined style={{ color: '#fc9539' }} size="small" />}
        variant="true"
        style={{
          color: '#fc9539',
        }}
        onClick={handleClickOpen}
      />

      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        hideBackdrop={true}
        ref={nodeRef}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Submit Review
        </DialogTitle>
        <DialogContent dividers>
          {' '}
          <div className="md-review">
            <span className="md-review__header">
              set review and get extra point for discount
            </span>
            <div className="rev-product">
              <img
                src={item.productId?.cardPicture && item.productId.cardPicture}
                alt="order"
                className="rev-product__image"
              />
              <div className="prod-content">
                <span className="prod-content__shop">{item.shop}</span>
                <span className="prod-content__name">
                  {item.productId?.name && item.productId.name}
                </span>
                <div className="rating">
                  <Rating
                    name="simple-controlled"
                    value={value}
                    onChange={(event, newValue) => {
                      setValue(newValue);
                    }}
                    size="large"
                  />
                </div>
              </div>
            </div>
            <div className="comment">
              <textarea
                name="comment"
                cols="30"
                rows="4"
                placeholder="Review"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </div>

            {!loading &&
              reviews.map((review, i) => (
                <Fragment key={i}>
                  {review.product === item.productId._id && (
                    <div className="exist-review">
                      <div className="exist-review__box">
                        <span className="exist-comment">{review.comment}</span>
                        <Rating size="small" value={review.rating} readOnly />
                      </div>
                    </div>
                  )}
                </Fragment>
              ))}
          </div>
        </DialogContent>
        <DialogActions>
          <div className="submit-review">
            <ButtonMat
              name="Submit"
              icon={<TurnedIn />}
              onClick={() => submitReview(item.productId._id)}
            />
          </div>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ReviewModel;
