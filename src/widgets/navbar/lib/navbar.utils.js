import { adminLinks, areaHeadLinks, devUserLinks, superUserLinks } from '@widgets/navbar/lib/navbar.constants'

export function getLinks (isAuth, user) {
  if (isAuth && user) {
    if (!('screens' in user)) {
      return superUserLinks
    }
    switch (user.roleName) {
      case 'Администратор':
        return adminLinks
        break
      case 'Начальник участка':
        return areaHeadLinks
        break
      case 'Руководитель проекта':
        return superUserLinks
        break
      case 'Разработчик':
        return devUserLinks
        break
    }
  }
}
