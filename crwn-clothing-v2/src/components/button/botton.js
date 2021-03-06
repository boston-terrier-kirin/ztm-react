import './button.styles.scss';

const BUTTON_TYPE_CLASSES = {
  google: 'google-sign-in',
  inverted: 'inverted',
};

const Button = (props) => {
  const { buttonType, children, ...otherProps } = props;
  const buttonClassName = BUTTON_TYPE_CLASSES[buttonType];

  return (
    <button className={`button-container ${buttonClassName}`} {...otherProps}>
      {children}
    </button>
  );
};

export default Button;
