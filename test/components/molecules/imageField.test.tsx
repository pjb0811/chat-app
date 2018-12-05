import { mount } from 'enzyme';
import * as React from 'react';
import { expect } from 'chai';
import ImageField, { Props } from 'components/molecules/ImageField';

type Params = {
  type: string;
  images: Array<{}>;
  receiver?: {};
};

describe('molecules', () => {
  describe('<ImageField />', () => {
    let temp: Params = {
      type: '',
      images: []
    };
    const file = new File(['test'], './test.jpg', {
      type: 'image/jpg'
    });
    const props: Props = {
      canDrop: false,
      classes: { paper: '', active: '', button: '' },
      files: [file],
      isOver: false,
      removeFiles: () => {
        props.files = [];
      },
      sendMessage: (params: Params) => {
        temp = params;
      }
    };

    const wrapper = mount(<ImageField {...props} />) as any;

    it('props 확인', () => {
      expect(wrapper.props()).to.deep.equal(props);
    });

    it('sendImages() 실행 시 sendMessage 함수 동작 확인', done => {
      wrapper.instance().sendImages();
      setTimeout(() => {
        expect(temp.type).to.equal('image');
        expect(temp.images.length).to.equal(1);
        expect(temp.images).to.deep.equal([
          { name: '.:test.jpg', base64: 'dGVzdA==' }
        ]);
        expect(props.files.length).to.equal(0);
        done();
      }, 100);
    });

    it('이미지 파일을 화면에 drag 시 element 상태 확인', done => {
      wrapper.setProps({ canDrop: true, files: [] });
      setTimeout(() => {
        expect(wrapper.find('h5').text()).to.equal('이미지를 올려주세요.');
        done();
      }, 100);
    });

    it('이미지 파일을 화면에 drop 시 element 상태 확인', done => {
      wrapper.setProps({ canDrop: true, files: [file] });
      wrapper.setState({});
      setTimeout(() => {
        wrapper.update();
        expect(wrapper.find('img').props().src).to.equal(
          'data:image/jpeg;base64,dGVzdA=='
        );
        done();
      }, 100);
    });

    it('이미지가 아닌 파일을 drop 시 element 및 send 버튼 상태 확인', done => {
      wrapper.setProps({
        canDrop: true,
        files: [
          new File(['foo'], 'foo.txt', {
            type: 'text/plain'
          })
        ]
      });
      wrapper.setState({});
      setTimeout(() => {
        wrapper.update();
        const content = wrapper.find('h5');
        const send = wrapper.find('button').get(0);
        expect(content.text()).to.equal('이미지 파일만 올려주세요.');
        expect(send.props.disabled).to.be.true;

        done();
      }, 100);
    });

    it('drop된 파일 삭제 시 props 값 확인', done => {
      const del = wrapper.find('button').get(1);
      props.files = [file];

      mount(del).simulate('click');

      setTimeout(() => {
        expect(props.files.length).to.equal(0);
        done();
      }, 100);
    });
  });
});
