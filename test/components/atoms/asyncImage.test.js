import { mount } from 'enzyme';
import React from 'react';
import { expect } from 'chai';
import AsyncImage from 'components/atoms/AsyncImage';

describe('atoms', () => {
  describe('<AsyncImage />', () => {
    const props = {
      image: { name: 'test.js', type: 'image', base64: 'base64' }
    };

    let file = {};

    const wrapper = mount(
      <AsyncImage {...props}>
        {props => <img src={props.base64} alt={props.name} />}
      </AsyncImage>
    );

    it('기본 props 전달 확인', () => {
      expect(wrapper.props().image).to.deep.equal(props.image);
    });

    it('이미지 파일 props 전달 확인', () => {
      file = new File(['test'], './test.jpg', {
        type: 'image/jpg'
      });
      wrapper.setProps({ image: file });
      expect(wrapper.props().image).to.deep.equal(file);
    });

    it('setImage() 실행 시 이미지 파일명 확인', () => {
      wrapper.instance().setImage();
      expect(wrapper.state().image.name).to.equal('.:test.jpg');
    });

    it('shouldComponentUpdate 호출 시 반환값 확인', () => {
      expect(
        wrapper
          .instance()
          .shouldComponentUpdate(wrapper.props(), wrapper.state())
      ).to.be.false;

      expect(
        wrapper
          .instance()
          .shouldComponentUpdate(wrapper.props(), { image: { name: 'test3' } })
      ).to.be.true;

      expect(
        wrapper.instance().shouldComponentUpdate(wrapper.props(), {
          image: { name: undefined }
        })
      ).to.be.true;
    });

    it('componentDidUpdate 호출 후 이미지 파일명 확인', done => {
      file = new File(['test1'], './test1.jpg', {
        type: 'image/jpg'
      });
      wrapper.setProps({ image: file });
      wrapper.instance().componentDidUpdate();
      setTimeout(() => {
        expect(wrapper.state().image.name).to.equal('.:test1.jpg');
        done();
      }, 100);
    });

    it('function as child props 확인', () => {
      const childWrapper = mount(
        wrapper.props().children(wrapper.state().image)
      );
      expect(childWrapper.props().alt).to.equal('.:test1.jpg');
    });
  });
});
