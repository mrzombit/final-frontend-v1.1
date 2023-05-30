import React from 'react';
import { FaCoins } from "react-icons/fa";
import { BsJournalCheck } from "react-icons/bs";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { BsCashCoin } from "react-icons/bs";
import { HiOutlineNewspaper } from "react-icons/hi";
import { BiCoinStack } from "react-icons/bi";
import { SiNounproject } from "react-icons/si";

export const bizSidebarData_biztools = [
  {
    title: 'เกี่ยวกับธุรกิจ',
    path: '/ProjectConfig',
    icon: <SiNounproject />,
    cName: 'nav-text'
  },
  {
    title: 'ต้นทุนธุรกิจ',
    path: '/TotalInvestment',
    icon: <BsCashCoin />,
    cName: 'nav-text',
    bgButt: '#1a83ff'
  },
  {
    title: 'ค่าใช้จ่ายประจำ',
    path: '/OperationCost',
    icon: <FaCoins />,
    cName: 'nav-text',
    bgButt: '#1a83ff'
  },
  {
    title: 'รายรับ',
    path: '/Revenue',
    icon: <RiMoneyDollarCircleLine />,
    cName: 'nav-text',
    bgButt: '#1a83ff'
  },
  {
    title: 'เงินกู้และหุ้นส่วน',
    path: '/Miscellaneous',
    icon: <BiCoinStack />,
    cName: 'nav-text',
    bgButt: '#1a83ff'
  },

];

export const bizSidebarData_checkbiz = [
    // {
    //   title: 'แดชบอร์ด',
    //   path: '/',
    //   icon: <TbDashboard/>,
    //   cName: 'nav-text'
    // },
    {
      title: 'ประเมินธุรกิจ',
      path: '/ffc',
      icon: <BsJournalCheck />,
      cName: 'nav-text'
    },
    {
      title: 'ออกเอกสาร',
      path: '/Statements',
      icon: <HiOutlineNewspaper />,
      cName: 'nav-text',
      bgButt: '#1a83ff'
    },
  
  ];