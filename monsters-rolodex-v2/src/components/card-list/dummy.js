/**
 * propsが変わらなくても、親がrenderしたら子供もrenderされる。
 */
const Dummy = () => {
  console.log('Dummy.render');
  return <></>;
};

export default Dummy;
