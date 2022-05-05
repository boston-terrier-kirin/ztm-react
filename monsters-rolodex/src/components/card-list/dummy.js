/**
 * propsが変わらなくても、親がrenderしたら子供もrenderされる。
 */
const Dummy = () => {
  console.log('Dummy.render');
  return <div>Dummy</div>;
};

export default Dummy;
