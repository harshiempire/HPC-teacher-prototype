import { createRouter, createWebHistory } from 'vue-router'
import TasksView from '../views/TasksView.vue'
import PracticeTestsView from '../views/PracticeTestsView.vue'
import ReportsView from '../views/ReportsView.vue'
import ProfileView from '../views/ProfileView.vue'
import TimetableView from '../views/TimetableView.vue'
import ContentLibraryView from '../views/ContentLibraryView.vue'
import NoticeBoardView from '../views/NoticeBoardView.vue'
import DashboardView from '../views/DashboardView.vue'
import SettingsView from '../views/SettingsView.vue'
import ClassInfoView from '../views/ClassInfoView.vue'
import AcademicJourneyView from '../views/AcademicJourneyView.vue'
import AcademicCalendarView from '../views/AcademicCalendarView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/dashboard'
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView
    },
    {
      path: '/tasks',
      name: 'tasks',
      component: TasksView
    },
    {
      path: '/tests',
      name: 'tests',
      component: PracticeTestsView
    },
    {
      path: '/reports',
      name: 'reports',
      component: ReportsView
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfileView
    },
    {
      path: '/timetable',
      name: 'timetable',
      component: TimetableView
    },
    {
      path: '/library',
      name: 'library',
      component: ContentLibraryView
    },
    {
      path: '/notices',
      name: 'notices',
      component: NoticeBoardView
    },
    {
      path: '/settings',
      name: 'settings',
      component: SettingsView
    },
    {
      path: '/class-info',
      name: 'class-info',
      component: ClassInfoView
    },
    {
      path: '/journey',
      name: 'journey',
      component: AcademicJourneyView
    },
    {
      path: '/calendar',
      name: 'calendar',
      component: AcademicCalendarView
    }
  ]
})

export default router