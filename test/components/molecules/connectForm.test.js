import { mount } from 'enzyme';
import React from 'react';
import { expect } from 'chai';
import ConnectForm from 'components/molecules/ConnectForm';
import { Formik } from 'formik';
import * as Yup from 'yup';

describe('molecules', () => {
  describe('<ConnectForm />', () => {
    const initialValues = {
      userId: ''
    };

    const onSubmit = (values, { setSubmitting }) => {
      setTimeout(() => {
        setSubmitting(false);
      }, 100);
    };

    const wrapper = mount(
      <Formik
        initialValues={initialValues}
        validationSchema={Yup.object().shape({
          userId: Yup.string()
            .min(3, '3글자 이상 입력해주세요')
            .required('ID를 입력해주세요')
        })}
        onSubmit={onSubmit}
        render={({ submitForm, isSubmitting }) => (
          <ConnectForm submitForm={submitForm} isSubmitting={isSubmitting} />
        )}
      />
    );

    const input = wrapper.find('input');
    const button = wrapper.find('button');

    it('기본 props 전달 확인', () => {
      expect(wrapper.props().onSubmit).to.equal(onSubmit);
      expect(wrapper.props().initialValues).to.deep.equal(initialValues);
    });

    it('id input 창 입력 확인', () => {
      input.simulate('change', { target: { value: 'Hello' } });
      expect(input.instance().value).to.equal('Hello');
    });

    it('id 팔수 입력 유효성 검사 확인', done => {
      input.simulate('change', { target: { value: '' } });
      expect(input.instance().value).to.equal('');
      setTimeout(() => {
        expect(wrapper.state().errors).to.deep.equal({
          userId: 'ID를 입력해주세요'
        });
        done();
      }, 100);
    });

    it('id 글자 길이 유효성 검사 확인', done => {
      input.simulate('change', { target: { value: '1' } });
      expect(input.instance().value).to.equal('1');
      setTimeout(() => {
        expect(wrapper.state().errors).to.deep.equal({
          userId: '3글자 이상 입력해주세요'
        });
        done();
      }, 100);
    });

    it('유효성 검사 실패시 접속 버튼 활성화 여부 확인', () => {
      expect(button.prop('disabled')).to.be.false;
    });

    it('유효성 검사 성공 시 submit 이벤트 확인', done => {
      input.simulate('change', { target: { value: 'success' } });
      button.simulate('click');
      expect(wrapper.state().isSubmitting).to.be.true;
      setTimeout(() => {
        expect(wrapper.state().isSubmitting).to.be.false;
        done();
      }, 200);
    });
  });
});
