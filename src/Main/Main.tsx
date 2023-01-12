import React, {
  ReactElement,
} from 'react';

import {
  Route, Routes,
} from 'react-router-dom';


import Content from '../Content/Content';

import './Main.css';
import DoublyLinkedList from "../helpers/DataStructures/DoublyLinkedList/DoublyLinkedList";


const Main = (): ReactElement => {
    // const dd = new DoublyLinkedList([12,23]);
    // dd.push();
    // console.log([...dd.values()])
  // const history = useHistory();
  // const dispatch = useDispatch();
  // const {
  //   currentUser, isInitializing,
  // } = useSelector((store: RootStore) => ({
  //   currentUser: store.currentUser.currentUser,
  //   isInitializing: store.app.isInitializing,
  // }));
  //
  // const [state, setState] = useState({
  //   menuIsOpen: true,
  //   mobile: false,
  // });
  //
  // useEffect(() => {
  //   dispatch(getUserRoleCompanyInformation(Number(localStorage.getItem('company')), history));
  // }, [dispatch, history]);
  //
  // useEffect(() => {
  //   if (Object.keys(currentUser).length && (!currentUser.first_name || !currentUser.last_name || !currentUser.phone)) {
  //     history.push('/my_data');
  //   }
  // }, [currentUser, history]);
  //
  // useEffect(() => {
  //   const updateDimensions = (): void => {
  //     if (window.screen.availWidth < TABLET_DISPLAY_WIDTH) {
  //       setState({
  //         ...state,
  //         mobile: true,
  //         menuIsOpen: false,
  //       });
  //       dispatch(resize(true));
  //     } else {
  //       setState({
  //         ...state,
  //         mobile: false,
  //         menuIsOpen: true,
  //       });
  //       dispatch(resize(false));
  //     }
  //   };
  //
  //   window.addEventListener('resize', updateDimensions);
  //
  //   return window.removeEventListener('resize', updateDimensions);
  // }, [dispatch, state]);
  //
  // useEffect(() => {
  //   if (Object.keys(currentUser).length) {
  //     dispatch(setInitializing(false));
  //   }
  // }, [dispatch, currentUser, state]);
  //
  // const menuClick = (): void => {
  //   const { menuIsOpen } = state;
  //   setState({ ...state, menuIsOpen: !menuIsOpen });
  // };
  //
  // const menuAutoClose = (): void => {
  //   const { mobile, menuIsOpen } = state;
  //
  //   if (mobile && menuIsOpen) {
  //     setState({
  //       ...state,
  //       menuIsOpen: false,
  //     });
  //   }
  // };
  //
  // if (isInitializing) {
  //   return <Loader />;
  // }
  return (
    <Routes>
      <Route path="*" element={
          <main
              // className="col main-container"
              id="mainContent"
              // onClick={menuAutoClose}
          >
              <Content/>
          </main>}>
        {/*<Header*/}
        {/*  mobile={state.mobile}*/}
        {/*  onMenuOpen={menuClick}*/}
        {/*/>*/}
        {/*<div className="row main-row">*/}
          {/*<Menu*/}
          {/*  isOpen={state.menuIsOpen}*/}
          {/*  onMenuClose={menuAutoClose}*/}
          {/*  mobile={state.mobile}*/}
          {/*/>*/}

        {/*</div>*/}
      </Route>
    </Routes>
  );
};

export default Main;
