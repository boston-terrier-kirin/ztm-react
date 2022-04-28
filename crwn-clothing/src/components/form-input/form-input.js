import './form-input.styles.scss';

const FormInput = (props) => {
  // TODO：...otherProps でうまくいく理由が分からない。
  const { label, ...otherProps } = props;

  const labelClassName = otherProps.value.length
    ? 'form-input-label shrink'
    : 'form-input-label';

  return (
    <div className="group">
      <input className="form-input" {...otherProps} />
      {label && <label className={labelClassName}>{label}</label>}
    </div>
  );
};

export default FormInput;
