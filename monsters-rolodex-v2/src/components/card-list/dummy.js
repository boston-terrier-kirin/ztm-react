/**
 * propsが変わらなくても、親がrenderしたら子供もrenderされる。
 */
const Dummy = () => {
  console.log('Dummy');
  return <></>;
};

export default Dummy;
