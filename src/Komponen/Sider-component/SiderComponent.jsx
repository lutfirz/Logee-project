import React, { useState } from 'react';
import { book, truck, price, person, left, right, bookA, truckA, priceA, personA } from '../../assets/Assets';
import { Button, Layout, Menu, Grid } from 'antd';
import { Link, useLocation, Routes, Route } from 'react-router-dom';
import { matchPath } from 'react-router-dom';
const { useBreakpoint } = Grid;

import './SiderComponent.css';
import BreadcrumbComponent from '../Breadcrumbs/Breadcrumbs-component';
import Katalog from '../Form/Form Katalog/Katalog';
import KontenKatalog from '../../Pages/Katalog Pages/Konten Katalog/KontenKatalog';
import TabelKatalog from '../../Pages/Katalog Pages/Tabel Katalog/TabelKatalog';
import TabelFilter from '../../Pages/Katalog Pages/Filter/TabelFilter';
import DetailInformasi from '../../Pages/Detail Informasi/DetailInformasi';
import DetailPage from '../../Pages/Detail Informasi/DetailPage';
import BuatPesanan from '../../Pages/Buat Pesanan/BuatPesanan';

const { Header, Sider, Content } = Layout;

const SiderComponent = () => {
  const [collapsed, setCollapsed] = useState(false);
  const screens = useBreakpoint();
  const location = useLocation();

  const isDetailPage = matchPath("/tabel-katalog/detail-informasi/:id", location.pathname);
  const isBuatPesananPage = matchPath("/buat-pesanan", location.pathname)

  // Helper function to determine if a path is active
  const isActive = (path) => location.pathname === path;

  // Menu items
  const menuItems = [
    {
      key: '/',
      icon: <img src={isActive('/') ? truckA : truck} alt="truck icon" />,
      label: <Link to="/" className={isActive('/') ? 'active-label' : 'default-label'}>Cari Pengiriman</Link>,
    },
    {
      key: '/tabel-katalog',
      icon: <img src={isActive('/tabel-katalog') ? bookA : book} alt="book" />,
      label: <Link to="/tabel-katalog" className={isActive('/tabel-katalog') ? 'active-label' : 'default-label'}>Daftar Pengiriman</Link>,
    },
    {
      key: '/invoice',
      icon: <img src={isActive('/invoice') ? priceA : price} alt="invoice" />,
      label: <Link to='/invoice' className={isActive('/invoice') ? 'active-label' : 'default-label'}>Daftar Invoice</Link>,
    },
    {
      key: '/akun',
      icon: <img src={isActive('/akun') ? personA : person} alt="account" />,
      label: <Link to="/akun" className={isActive('/akun') ? 'active-label' : 'default-label'}>Akun</Link>,
    },
  ];

  return (
    <Layout>
      <Sider className='sider' trigger={null} collapsible collapsed={screens.xs ? true : collapsed}>
        <Menu
          className="sider-menu"
          theme="light"
          mode="inline"
          selectedKeys={[location.pathname]} // Highlight the current route
          items={menuItems}
        />
      </Sider>

      <Layout>
        <Header className="layout-header">
        {!screens.xs && (
            <Button
              className="sider-toggle-button"
              icon={collapsed ? <img src={right} /> : <img src={left} />}
              onClick={() => setCollapsed(!collapsed)}
            />
          )}
        </Header>
        <Content className="layout-content">
  <BreadcrumbComponent className="breadcrumb-container" />
  {!isDetailPage && !isBuatPesananPage && <Katalog />}

  <Routes>
    <Route path="/" element={<KontenKatalog />} />
    <Route path="/filter" element={<TabelFilter />} />
    <Route path="/tabel-katalog" element={<TabelKatalog />} />
    <Route path="/tabel-katalog/detail-informasi/:id" element={<><DetailInformasi /><DetailPage /></>} />
    <Route path='/buat-pesanan' element={<BuatPesanan/>}/>
  </Routes>
</Content>

      </Layout>
    </Layout>
  );
};

export default SiderComponent;
