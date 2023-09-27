import React from 'react'
import { AppNavLink, DropDownMenuWithLinks } from '@shared/ui/index.js'

const calc = [
  <AppNavLink to={'intagrsplans'} text={'Планы ВД'}/>,
  <AppNavLink to={'workloadcoefobjects'} text={'Объекты коэф. загр.'}/>,
  <AppNavLink to={'salaryCalculations'} text={'Расчеты'}/>,
  <AppNavLink to={'testCalc'} text={'Тест расчетов'}/>
]

const devTools = [
  <AppNavLink to={'messages'} text={'Messages'}/>,
  <AppNavLink to={'sandbox'} text={'Песочница'}/>,
  <AppNavLink to={'test'} text={'Test'}/>
]

// не забывать синхронизировать с роутами!

export const superUserLinks = [
  <AppNavLink to={'users'} text={'Пользователи'}/>,
  <AppNavLink to={'roles'} text={'Роли'}/>,
  <DropDownMenuWithLinks text={'Расчёт ЗП'} items={calc}/>,
  <AppNavLink to={'od-main'} text={'Контракты'}/>,
  <AppNavLink to={'account'} text={'Личный кабинет'}/>,
  <AppNavLink to={'typedoc'} text={'Редактор документов'}/>,
  <DropDownMenuWithLinks text={'Тестирование'} items={devTools}/>
]

export const adminLinks = [
  <AppNavLink to={'users'} text={'Пользователи'}/>,
  <AppNavLink to={'roles'} text={'Роли'}/>,
  <DropDownMenuWithLinks text={'Расчёт ЗП'} items={calc}/>,
  <AppNavLink to={'od-main'} text={'Контракты'}/>,
  <AppNavLink to={'account'} text={'Личный кабинет'}/>,
  <AppNavLink to={'typedoc'} text={'Редактор документов'}/>,
  <DropDownMenuWithLinks text={'Тестирование'} items={devTools}/>
]

export const areaHeadLinks = [
  <AppNavLink to={'users'} text={'Пользователи'}/>,
  <AppNavLink to={'roles'} text={'Роли'}/>,
  <DropDownMenuWithLinks text={'Расчёт ЗП'} items={calc}/>,
  <AppNavLink to={'od-main'} text={'Контракты'}/>,
  <AppNavLink to={'account'} text={'Личный кабинет'}/>,
  <AppNavLink to={'typedoc'} text={'Редактор документов'}/>,
  <DropDownMenuWithLinks text={'Тестирование'} items={devTools}/>
]

export const devUserLinks = [
  <AppNavLink to={'users'} text={'Пользователи'}/>,
  <AppNavLink to={'roles'} text={'Роли'}/>,
  <DropDownMenuWithLinks text={'Расчёт ЗП'} items={calc}/>,
  <AppNavLink to={'od-main'} text={'Контракты'}/>,
  <AppNavLink to={'account'} text={'Личный кабинет'}/>,
  <AppNavLink to={'typedoc'} text={'Редактор документов'}/>,
  <DropDownMenuWithLinks text={'Тестирование'} items={devTools}/>
]
