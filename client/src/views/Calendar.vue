<template>
  <div class="flex min-h-screen bg-gray-50">
    <!-- Mobile Header -->
    <div class="md:hidden fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50">
      <div class="flex items-center justify-between p-4">
        <div class="flex items-center gap-3">
          <div class="h-8 w-8 rounded-lg bg-gradient-to-br from-cyan-500 to-teal-500 flex items-center justify-center">
            <svg class="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <span class="font-bold text-lg text-gray-800">ปฏิทินการจอง</span>
        </div>
        <button 
          @click="showCreateModal = true"
          class="p-2 bg-gradient-to-r from-cyan-500 to-teal-500 text-white rounded-lg hover:from-cyan-600 hover:to-teal-600 transition-all"
        >
          <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Calendar Sidebar -->
    <aside class="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col">
      <div class="p-6 flex items-center gap-3 border-b border-gray-100">
        <div class="h-10 w-10 rounded-xl bg-gradient-to-br from-cyan-500 to-teal-500 flex items-center justify-center">
          <svg class="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        <span class="font-bold text-lg text-gray-800">Clinic Calendar</span>
      </div>

      <!-- Navigation -->
      <nav class="p-4 space-y-1 border-b border-gray-100">
        <router-link 
          to="/dashboard"
          class="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-50 hover:text-cyan-600 transition-colors text-sm"
        >
          <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          แดชบอร์ด
        </router-link>
        <div class="w-full flex items-center gap-3 px-4 py-2 rounded-lg bg-cyan-50 text-cyan-600 font-medium text-sm">
          <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          ปฏิทินการจอง
        </div>
      </nav>

      <!-- Mini Calendar -->
      <div class="p-4 border-b border-gray-100">
        <div class="text-sm font-medium text-gray-700 mb-3">{{ currentMonthYear }}</div>
        <div class="grid grid-cols-7 gap-1 text-xs text-gray-500 mb-2">
          <div v-for="day in ['อา', 'จ', 'อ', 'พ', 'พฤ', 'ศ', 'ส']" :key="day" class="text-center py-1">
            {{ day }}
          </div>
        </div>
        <div class="grid grid-cols-7 gap-1">
          <button
            v-for="date in miniCalendarDates"
            :key="date.key"
            @click="selectDate(date.date)"
            :class="[
              'h-8 w-8 text-xs rounded-lg transition-all',
              date.isCurrentMonth 
                ? 'text-gray-700 hover:bg-gray-100' 
                : 'text-gray-300',
              date.isToday 
                ? 'bg-cyan-500 text-white hover:bg-cyan-600' 
                : '',
              date.isSelected 
                ? 'bg-cyan-100 text-cyan-700 ring-2 ring-cyan-500' 
                : '',
              date.hasBookings 
                ? 'font-semibold' 
                : ''
            ]"
          >
            {{ date.day }}
          </button>
        </div>
      </div>

      <!-- Status Legend -->
      <div class="p-4 border-b border-gray-100">
        <div class="text-sm font-medium text-gray-700 mb-3">สถานะการจอง</div>
        <div class="space-y-2">
          <!-- Active Status (Always shown) -->
          <div class="flex items-center gap-2">
            <div class="w-4 h-4 rounded bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center">
              <svg class="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span class="text-xs text-gray-600">ยืนยันแล้ว</span>
          </div>
          <div class="flex items-center gap-2">
            <div class="w-4 h-4 rounded bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center">
              <svg class="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span class="text-xs text-gray-600">รอยืนยัน</span>
          </div>
          
          <!-- Inactive Status (Only when toggle is on) -->
          <template v-if="showInactiveBookings">
            <div class="border-t border-gray-200 pt-2 mt-2">
              <div class="flex items-center gap-2 mb-2">
                <span class="text-xs text-gray-500 font-medium">การจองที่ไม่ใช้งาน:</span>
              </div>
              <div class="flex items-center gap-2">
                <div class="w-4 h-4 rounded bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                  <svg class="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span class="text-xs text-gray-500">เสร็จสิ้น</span>
              </div>
              <div class="flex items-center gap-2">
                <div class="w-4 h-4 rounded bg-gradient-to-br from-gray-400 to-gray-500 flex items-center justify-center">
                  <svg class="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                <span class="text-xs text-gray-500">ยกเลิก</span>
              </div>
            </div>
          </template>
        </div>
      </div>

      <!-- Booking Filter -->
      <div class="p-4 border-b border-gray-100">
        <div class="text-sm font-medium text-gray-700 mb-3">ตัวกรอง</div>
        <div class="space-y-2">
          <label class="flex items-center gap-2">
            <input 
              type="checkbox" 
              v-model="showInactiveBookings"
              class="rounded border-gray-300 text-cyan-500 focus:ring-cyan-500"
            >
            <span class="text-sm text-gray-600">แสดงการจองที่ยกเลิก/เสร็จสิ้น</span>
          </label>
        </div>
      </div>

      <!-- Room Filter -->
      <div class="p-4 border-b border-gray-100">
        <div class="text-sm font-medium text-gray-700 mb-3">ห้อง</div>
        <div class="space-y-2">
          <label class="flex items-center gap-2">
            <input 
              type="checkbox" 
              v-model="showAllRooms"
              @change="toggleAllRooms"
              class="rounded border-gray-300 text-cyan-500 focus:ring-cyan-500"
            >
            <span class="text-sm text-gray-600">แสดงทั้งหมด</span>
          </label>
          <div class="space-y-1 max-h-48 overflow-y-auto">
            <label 
              v-for="room in rooms" 
              :key="room.id"
              class="flex items-center gap-2"
            >
              <input 
                type="checkbox" 
                v-model="selectedRooms"
                :value="room.id"
                class="rounded border-gray-300 text-cyan-500 focus:ring-cyan-500"
              >
              <div 
                class="w-3 h-3 rounded-full"
                :class="getRoomColor(room.type)"
              ></div>
              <span class="text-sm text-gray-600 truncate">{{ room.name }}</span>
            </label>
          </div>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="p-4 flex-1 flex flex-col justify-end">
        <button 
          @click="showCreateModal = true"
          class="w-full px-4 py-3 bg-gradient-to-r from-cyan-500 to-teal-500 text-white rounded-lg hover:from-cyan-600 hover:to-teal-600 transition-all shadow-lg shadow-cyan-500/30 flex items-center justify-center gap-2 font-medium"
        >
          <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          จองห้องใหม่
        </button>
        
        <!-- Role Info -->
        <div v-if="userRole !== 'ADMIN'" class="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div class="flex items-center gap-2 text-yellow-700">
            <svg class="h-4 w-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            <span class="text-xs font-medium">
              การจองจะอยู่ในสถานะ "รอยืนยัน" จนกว่าผู้ดูแลจะอนุมัติ
            </span>
          </div>
        </div>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 flex flex-col overflow-hidden pt-20 md:pt-0 pb-20 md:pb-0">
      <!-- Header -->
      <header class="hidden md:flex h-16 bg-white border-b border-gray-200 items-center justify-between px-6">
        <div class="flex items-center gap-4">
          <div class="flex items-center gap-2">
            <button 
              @click="previousPeriod"
              class="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <svg class="h-4 w-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button 
              @click="nextPeriod"
              class="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <svg class="h-4 w-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
            <button 
              @click="goToToday"
              class="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              วันนี้
            </button>
          </div>
          <h1 class="text-xl font-semibold text-gray-800">{{ currentPeriodTitle }}</h1>
        </div>

        <div class="flex items-center gap-4">
          <!-- View Toggle -->
          <div class="flex bg-gray-100 p-1 rounded-lg">
            <button
              v-for="view in viewOptions"
              :key="view.value"
              @click="currentView = view.value"
              :class="[
                'px-3 py-1 text-sm font-medium rounded-md transition-all',
                currentView === view.value
                  ? 'bg-white text-gray-800 shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              ]"
            >
              {{ view.label }}
            </button>
          </div>

          <!-- Search -->
          <div class="relative">
            <svg class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              v-model="searchQuery"
              placeholder="ค้นหาการจอง..."
              class="w-64 pl-10 pr-4 py-2 bg-gray-50 border border-transparent rounded-lg text-sm focus:outline-none focus:bg-white focus:border-cyan-300 transition-all"
            />
          </div>
        </div>
      </header>

      <!-- Calendar Content -->
      <div class="flex-1 overflow-hidden bg-white">
        <!-- Mobile View Selector -->
        <div class="md:hidden bg-white border-b border-gray-200 p-4 sticky top-0 z-40">
          <div class="flex bg-gray-100 p-1 rounded-xl">
            <button
              v-for="view in viewOptions"
              :key="view.value"
              @click="currentView = view.value"
              :class="[
                'flex-1 px-3 py-2 text-sm font-medium rounded-lg transition-all',
                currentView === view.value
                  ? 'bg-white text-gray-800 shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              ]"
            >
              {{ view.label }}
            </button>
          </div>
        </div>

        <!-- Week View -->
        <div v-if="currentView === 'week'" class="h-full flex flex-col">
          <!-- Week Header -->
          <div class="border-b border-gray-200 bg-white sticky top-0 z-10">
            <!-- Mobile Week Header -->
            <div class="md:hidden">
              <div class="flex items-center justify-between p-4">
                <button @click="previousPeriod" class="p-2 hover:bg-gray-100 rounded-lg">
                  <svg class="h-5 w-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <h2 class="text-lg font-semibold text-gray-800">{{ currentPeriodTitle }}</h2>
                <button @click="nextPeriod" class="p-2 hover:bg-gray-100 rounded-lg">
                  <svg class="h-5 w-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
              <div class="grid grid-cols-7 border-t border-gray-100">
                <div 
                  v-for="day in weekDays" 
                  :key="day.key"
                  class="p-3 text-center border-r border-gray-100 last:border-r-0"
                  @click="selectDate(day.fullDate)"
                >
                  <div class="text-xs text-gray-500 uppercase font-medium mb-1">{{ day.dayName }}</div>
                  <div 
                    :class="[
                      'w-8 h-8 mx-auto rounded-full flex items-center justify-center text-sm font-semibold transition-all',
                      day.isToday 
                        ? 'bg-cyan-500 text-white shadow-lg' 
                        : 'text-gray-700 hover:bg-gray-100'
                    ]"
                  >
                    {{ day.date }}
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Desktop Week Header -->
            <div class="hidden md:grid grid-cols-8">
              <!-- Time column header -->
              <div class="h-20 border-r border-gray-200 bg-white flex items-end justify-center pb-2">
                <span class="text-xs text-gray-500 font-medium">GMT+7</span>
              </div>
              <!-- Day headers -->
              <div 
                v-for="day in weekDays" 
                :key="day.key"
                class="h-20 border-r border-gray-200 flex flex-col items-center justify-center bg-white hover:bg-gray-50 transition-colors cursor-pointer"
                @click="selectDate(day.fullDate)"
              >
                <div class="text-xs text-gray-500 uppercase font-medium mb-1">{{ day.dayName }}</div>
                <div 
                  :class="[
                    'w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all',
                    day.isToday 
                      ? 'bg-cyan-500 text-white shadow-lg' 
                      : 'text-gray-700 hover:bg-gray-100'
                  ]"
                >
                  {{ day.date }}
                </div>
              </div>
            </div>
          </div>

          <!-- Week Body -->
          <div class="flex-1 overflow-y-auto">
            <div class="grid grid-cols-8 min-h-full">
              <!-- Time Column -->
              <div class="border-r border-gray-200 bg-gray-50/50">
                <div 
                  v-for="hour in hours" 
                  :key="hour"
                  class="h-20 border-b border-gray-100 flex items-start justify-end pr-3 pt-2 relative"
                >
                  <span class="text-xs text-gray-500 font-medium bg-gray-50/50 px-2 py-1 rounded">
                    {{ formatHour(hour) }}
                  </span>
                  <!-- Half hour line -->
                  <div class="absolute top-10 right-0 w-2 h-px bg-gray-200"></div>
                </div>
              </div>

              <!-- Day Columns -->
              <div 
                v-for="day in weekDays" 
                :key="day.key"
                class="border-r border-gray-200 relative hover:bg-gray-50/30 transition-colors"
                @click="createQuickBooking(day.fullDate, $event)"
              >
                <!-- Hour Lines -->
                <div 
                  v-for="hour in hours" 
                  :key="hour"
                  class="h-20 border-b border-gray-100 relative"
                >
                  <!-- Half hour line -->
                  <div class="absolute top-10 left-0 right-0 h-px bg-gray-100"></div>
                </div>

                <!-- Current time indicator -->
                <div 
                  v-if="day.isToday && showCurrentTime"
                  :style="getCurrentTimeStyle()"
                  class="absolute left-0 right-0 z-20 pointer-events-none"
                >
                  <div class="flex items-center">
                    <div class="w-3 h-3 bg-red-500 rounded-full border-2 border-white shadow-sm"></div>
                    <div class="flex-1 h-0.5 bg-red-500"></div>
                  </div>
                </div>

                <!-- Bookings -->
                <div 
                  v-for="booking in getBookingsForDay(day.fullDate)" 
                  :key="booking.id"
                  @click.stop="selectBooking(booking)"
                  :style="getBookingStyle(booking)"
                  :class="[
                    'absolute left-1 right-1 rounded-lg shadow-sm cursor-pointer transition-all hover:shadow-md z-10 border-2',
                    getBookingStatusClass(booking.status),
                    selectedBooking?.id === booking.id ? 'ring-2 ring-cyan-400 ring-offset-1' : ''
                  ]"
                >
                  <div class="p-2 h-full overflow-hidden relative">
                    <!-- Status Icon -->
                    <div class="absolute top-1 right-1">
                      <div class="w-4 h-4 bg-white/20 rounded-full flex items-center justify-center">
                        <svg class="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="getStatusIcon(booking.status)" />
                        </svg>
                      </div>
                    </div>
                    
                    <div class="text-xs font-semibold text-white truncate pr-6">
                      {{ booking.room.name }}
                    </div>
                    <div class="text-xs text-white/90 truncate mt-0.5">
                      {{ booking.user.name }}
                    </div>
                    <div class="text-xs text-white/80 mt-0.5 flex items-center gap-1">
                      <span>{{ formatTime(booking.startTime) }}</span>
                      <span class="text-[10px] bg-white/20 px-1 rounded">{{ getStatusText(booking.status) }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Month View -->
        <div v-else-if="currentView === 'month'" class="h-full flex flex-col">
          <!-- Month Header -->
          <div class="border-b border-gray-200 bg-white sticky top-0 z-10">
            <div class="grid grid-cols-7">
              <div 
                v-for="day in ['อาทิตย์', 'จันทร์', 'อังคาร', 'พุธ', 'พฤหัสบดี', 'ศุกร์', 'เสาร์']" 
                :key="day"
                class="h-12 border-r border-gray-200 flex items-center justify-center text-sm font-semibold text-gray-600 bg-gray-50/50"
              >
                {{ day }}
              </div>
            </div>
          </div>

          <!-- Month Body -->
          <div class="flex-1 overflow-hidden">
            <div class="grid grid-cols-7 h-full">
              <div 
                v-for="date in monthDates" 
                :key="date.key"
                @click="selectDate(date.date)"
                :class="[
                  'border-r border-b border-gray-200 p-2 cursor-pointer hover:bg-gray-50 transition-colors min-h-[120px]',
                  date.isCurrentMonth ? 'bg-white' : 'bg-gray-50/50',
                  date.isToday ? 'bg-cyan-50/50' : '',
                  date.isSelected ? 'ring-2 ring-cyan-400 ring-inset' : ''
                ]"
              >
                <div class="flex items-center justify-between mb-2">
                  <div 
                    :class="[
                      'w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all',
                      date.isCurrentMonth ? 'text-gray-700' : 'text-gray-400',
                      date.isToday ? 'bg-cyan-500 text-white shadow-md' : 'hover:bg-gray-100'
                    ]"
                  >
                    {{ date.day }}
                  </div>
                  <div v-if="getBookingsForDay(date.fullDate).length > 0" class="text-xs text-gray-500">
                    {{ getBookingsForDay(date.fullDate).length }}
                  </div>
                </div>
                
                <div class="space-y-1">
                  <div 
                    v-for="booking in getBookingsForDay(date.fullDate).slice(0, 4)" 
                    :key="booking.id"
                    @click.stop="selectBooking(booking)"
                    :class="[
                      'text-xs px-2 py-1 rounded-lg truncate cursor-pointer transition-all hover:shadow-sm border-l-2',
                      getBookingStatusClass(booking.status).replace('bg-gradient-to-br', 'bg-opacity-10').replace('border-', 'border-l-'),
                      booking.status === 'CONFIRMED' ? 'bg-emerald-50 text-emerald-700 border-l-emerald-500' :
                      booking.status === 'PENDING' ? 'bg-orange-50 text-orange-700 border-l-orange-500' :
                      booking.status === 'CANCELLED' ? 'bg-gray-50 text-gray-500 border-l-gray-400' :
                      'bg-blue-50 text-blue-700 border-l-blue-500'
                    ]"
                  >
                    <div class="flex items-center gap-1">
                      <svg class="w-2.5 h-2.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="getStatusIcon(booking.status)" />
                      </svg>
                      <div class="font-medium truncate">{{ booking.room.name }}</div>
                    </div>
                    <div class="text-xs opacity-80 truncate ml-3">{{ formatTime(booking.startTime) }}</div>
                  </div>
                  <div 
                    v-if="getBookingsForDay(date.fullDate).length > 4"
                    class="text-xs text-gray-500 px-2 py-1 hover:bg-gray-100 rounded-md cursor-pointer"
                    @click.stop="viewMoreBookings(date.fullDate)"
                  >
                    +{{ getBookingsForDay(date.fullDate).length - 4 }} เพิ่มเติม
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Day View -->
        <div v-else-if="currentView === 'day'" class="h-full flex flex-col">
          <!-- Day Header -->
          <div class="border-b border-gray-200 bg-white p-6 sticky top-0 z-10">
            <div class="text-center">
              <div class="text-sm text-gray-500 font-medium mb-1">
                {{ selectedDate.toLocaleDateString('th-TH', { weekday: 'long' }) }}
              </div>
              <div 
                :class="[
                  'inline-flex items-center justify-center w-16 h-16 rounded-full text-2xl font-bold transition-all',
                  isToday(selectedDate) 
                    ? 'bg-cyan-500 text-white shadow-lg' 
                    : 'text-gray-800 hover:bg-gray-100'
                ]"
              >
                {{ selectedDate.getDate() }}
              </div>
              <div class="text-sm text-gray-500 font-medium mt-1">
                {{ selectedDate.toLocaleDateString('th-TH', { month: 'long', year: 'numeric' }) }}
              </div>
            </div>
          </div>

          <!-- Day Body -->
          <div class="flex-1 overflow-y-auto">
            <div class="grid grid-cols-12">
              <!-- Time Column -->
              <div class="col-span-2 border-r border-gray-200 bg-gray-50/50">
                <div 
                  v-for="hour in hours" 
                  :key="hour"
                  class="h-20 border-b border-gray-100 flex items-start justify-end pr-4 pt-3"
                >
                  <span class="text-sm text-gray-500 font-medium bg-gray-50/50 px-2 py-1 rounded">
                    {{ formatHour(hour) }}
                  </span>
                </div>
              </div>

              <!-- Day Column -->
              <div class="col-span-10 relative hover:bg-gray-50/30 transition-colors" @click="createQuickBooking(selectedDate, $event)">
                <!-- Hour Lines -->
                <div 
                  v-for="hour in hours" 
                  :key="hour"
                  class="h-20 border-b border-gray-100 relative"
                >
                  <!-- Half hour line -->
                  <div class="absolute top-10 left-0 right-0 h-px bg-gray-100"></div>
                </div>

                <!-- Current time indicator -->
                <div 
                  v-if="isToday(selectedDate) && showCurrentTime"
                  :style="getCurrentTimeStyle()"
                  class="absolute left-0 right-0 z-20 pointer-events-none"
                >
                  <div class="flex items-center">
                    <div class="w-4 h-4 bg-red-500 rounded-full border-2 border-white shadow-md"></div>
                    <div class="flex-1 h-0.5 bg-red-500"></div>
                  </div>
                </div>

                <!-- Bookings -->
                <div 
                  v-for="booking in getBookingsForDay(selectedDate)" 
                  :key="booking.id"
                  @click.stop="selectBooking(booking)"
                  :style="getBookingStyle(booking)"
                  :class="[
                    'absolute left-4 right-4 rounded-xl shadow-lg cursor-pointer transition-all hover:shadow-xl z-10 border-2',
                    getBookingStatusClass(booking.status),
                    selectedBooking?.id === booking.id ? 'ring-2 ring-cyan-400 ring-offset-2' : ''
                  ]"
                >
                  <div class="p-4 h-full overflow-hidden relative">
                    <!-- Status Badge -->
                    <div class="absolute top-2 right-2 flex items-center gap-1">
                      <div class="bg-white/20 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1">
                        <svg class="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="getStatusIcon(booking.status)" />
                        </svg>
                        <span class="text-xs text-white font-medium">{{ getStatusText(booking.status) }}</span>
                      </div>
                    </div>
                    
                    <div class="font-semibold text-white text-base mb-1 pr-20">{{ booking.room.name }}</div>
                    <div class="text-sm text-white/90 mb-1">{{ booking.user.name }}</div>
                    <div class="text-sm text-white/80 mb-2">
                      {{ formatTime(booking.startTime) }} - {{ formatTime(booking.endTime) }}
                    </div>
                    <div v-if="booking.notes" class="text-sm text-white/70" style="display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">
                      {{ booking.notes }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Booking Detail Modal -->
    <div v-if="selectedBooking" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50" @click="selectedBooking = null">
      <div @click.stop class="bg-white rounded-2xl p-6 max-w-md w-full mx-4 shadow-2xl">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-semibold text-gray-800">รายละเอียดการจอง</h3>
          <button @click="selectedBooking = null" class="p-2 hover:bg-gray-100 rounded-lg">
            <svg class="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div class="space-y-4">
          <div>
            <label class="text-sm font-medium text-gray-700">ห้อง</label>
            <p class="text-gray-800">{{ selectedBooking.room.name }}</p>
          </div>
          <div>
            <label class="text-sm font-medium text-gray-700">ผู้จอง</label>
            <p class="text-gray-800">{{ selectedBooking.user.name }}</p>
          </div>
          <div>
            <label class="text-sm font-medium text-gray-700">เวลา</label>
            <p class="text-gray-800">
              {{ formatDateTime(selectedBooking.startTime) }} - {{ formatTime(selectedBooking.endTime) }}
            </p>
          </div>
          <div>
            <label class="text-sm font-medium text-gray-700">สถานะ</label>
            <span :class="getStatusColor(selectedBooking.status)" class="inline-block px-3 py-1 rounded-full text-sm font-medium">
              {{ getStatusText(selectedBooking.status) }}
            </span>
          </div>
          <div v-if="selectedBooking.notes">
            <label class="text-sm font-medium text-gray-700">หมายเหตุ</label>
            <p class="text-gray-800">{{ selectedBooking.notes }}</p>
          </div>
        </div>

        <!-- Action Buttons (Admin Only) -->
        <div v-if="userRole === 'ADMIN'" class="flex gap-3 mt-6">
          <button 
            v-if="selectedBooking.status === 'PENDING'"
            @click="updateBookingStatus(selectedBooking.id, 'CONFIRMED')"
            class="flex-1 px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
          >
            อนุมัติ
          </button>
          <button 
            v-if="selectedBooking.status !== 'CANCELLED'"
            @click="confirmCancelBooking(selectedBooking.id)"
            class="flex-1 px-4 py-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition-colors"
          >
            ยกเลิก
          </button>
        </div>
        
        <!-- Info Message for Non-Admin Users -->
        <div v-else class="mt-6">
          <div class="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
            <div class="flex items-center justify-center gap-2 text-blue-600 mb-2">
              <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span class="font-medium">ข้อมูลการจอง</span>
            </div>
            <p class="text-sm text-blue-600">
              {{ userRole === 'DOCTOR' ? 'แพทย์' : 'เจ้าหน้าที่' }}สามารถดูข้อมูลการจองได้เท่านั้น<br>
              การอนุมัติต้องติดต่อผู้ดูแลระบบ
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Create Booking Modal -->
    <div v-if="showCreateModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50" @click="showCreateModal = false">
      <div @click.stop class="bg-white rounded-2xl p-6 max-w-md w-full mx-4 shadow-2xl">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-semibold text-gray-800">จองห้องใหม่</h3>
          <button @click="showCreateModal = false" class="p-2 hover:bg-gray-100 rounded-lg">
            <svg class="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <form @submit.prevent="createBooking" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">ห้อง</label>
            <select v-model="newBooking.roomId" required class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500">
              <option value="">เลือกห้อง</option>
              <option v-for="room in rooms" :key="room.id" :value="room.id">{{ room.name }}</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">ผู้จอง</label>
            <select v-model="newBooking.userId" required class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500">
              <option value="">เลือกผู้จอง</option>
              <option v-for="user in users" :key="user.id" :value="user.id">{{ user.name }}</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">วันที่</label>
            <input 
              type="date" 
              v-model="newBooking.date" 
              required 
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
            >
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">เวลาเริ่ม</label>
              <input 
                type="time" 
                v-model="newBooking.startTime" 
                required 
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
              >
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">เวลาสิ้นสุด</label>
              <input 
                type="time" 
                v-model="newBooking.endTime" 
                required 
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
              >
            </div>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">หมายเหตุ</label>
            <textarea 
              v-model="newBooking.notes" 
              rows="3"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
              placeholder="หมายเหตุเพิ่มเติม..."
            ></textarea>
          </div>
          
          <div class="flex gap-3 pt-4">
            <button 
              type="button" 
              @click="showCreateModal = false"
              class="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              ยกเลิก
            </button>
            <button 
              type="submit"
              class="flex-1 px-4 py-2 bg-gradient-to-r from-cyan-500 to-teal-500 text-white rounded-lg hover:from-cyan-600 hover:to-teal-600 transition-all"
            >
              จองห้อง
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Cancel Confirmation Modal -->
    <div v-if="showCancelConfirm" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50" @click="showCancelConfirm = false">
      <div @click.stop class="bg-white rounded-2xl p-6 max-w-sm w-full mx-4 shadow-2xl">
        <div class="flex items-center justify-center mb-4">
          <div class="w-12 h-12 rounded-full bg-rose-100 flex items-center justify-center">
            <svg class="h-6 w-6 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
        </div>
        
        <h3 class="text-lg font-semibold text-gray-800 text-center mb-2">ยืนยันการยกเลิก</h3>
        <p class="text-sm text-gray-600 text-center mb-6">
          คุณแน่ใจหรือไม่ว่าต้องการยกเลิกการจองนี้?<br>
          การดำเนินการนี้ไม่สามารถย้อนกลับได้
        </p>
        
        <div class="flex gap-3">
          <button 
            @click="showCancelConfirm = false"
            class="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
          >
            ไม่ยกเลิก
          </button>
          <button 
            @click="cancelBookingConfirmed"
            class="flex-1 px-4 py-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition-colors font-medium"
          >
            ยืนยันยกเลิก
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Bottom Navigation -->
    <div class="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
      <div class="grid grid-cols-3 gap-1">
        <!-- Dashboard -->
        <router-link to="/dashboard" class="flex flex-col items-center py-2 px-1 text-gray-600 hover:text-cyan-600 transition-colors">
          <svg class="h-6 w-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <span class="text-xs font-medium">แดชบอร์ด</span>
        </router-link>
        
        <!-- Calendar -->
        <div class="flex flex-col items-center py-2 px-1 bg-cyan-50 text-cyan-600">
          <svg class="h-6 w-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span class="text-xs font-medium">ปฏิทิน</span>
        </div>
        
        <!-- Rooms (Admin Only) -->
        <router-link 
          v-if="userRole === 'ADMIN'" 
          to="/rooms" 
          class="flex flex-col items-center py-2 px-1 text-gray-600 hover:text-cyan-600 transition-colors"
        >
          <svg class="h-6 w-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
          <span class="text-xs font-medium">จัดการห้อง</span>
        </router-link>
        
        <!-- User Info (Non-Admin) -->
        <div 
          v-else
          class="flex flex-col items-center py-2 px-1 text-gray-600"
        >
          <div class="h-6 w-6 mb-1 rounded-full bg-gradient-to-br from-cyan-400 to-teal-400 flex items-center justify-center">
            <span class="text-white text-xs font-semibold">{{ userRole === 'DOCTOR' ? 'ด' : 'จ' }}</span>
          </div>
          <span class="text-xs font-medium">{{ userRole === 'DOCTOR' ? 'แพทย์' : 'เจ้าหน้าที่' }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'

import networkConfig from '../config/network.js'

// API base URL - Auto-detect for LAN
const API_BASE = networkConfig.apiBase

// Reactive data
const currentView = ref('week')
const selectedDate = ref(new Date())
const selectedBooking = ref(null)
const showCreateModal = ref(false)
const showCancelConfirm = ref(false)
const bookingToCancel = ref(null)
const searchQuery = ref('')
const showAllRooms = ref(true)
const selectedRooms = ref([])
const showInactiveBookings = ref(false)

// Get user role from localStorage
const userRole = ref('')
const getCurrentUser = () => {
  // Use sessionStorage for tab-specific data
  const user = sessionStorage.getItem('user')
  const tabId = sessionStorage.getItem('tabId')
  const isLoggedIn = sessionStorage.getItem('isLoggedIn')
  
  if (user && tabId && isLoggedIn === 'true') {
    try {
      const userData = JSON.parse(user)
      
      // Check if this tab's session is valid
      if (userData.tabId === tabId) {
        userRole.value = userData.role || 'STAFF'
        console.log('Calendar - Valid tab session for user:', userData.name, 'Role:', userData.role, 'TabID:', tabId)
      } else {
        console.warn('Calendar - Tab session mismatch detected')
        window.location.href = '/login'
      }
    } catch (error) {
      console.error('Calendar - Error parsing user data:', error)
      window.location.href = '/login'
    }
  } else {
    console.warn('Calendar - No valid tab session found')
    window.location.href = '/login'
  }
}

// Data from API
const rooms = ref([])
const bookings = ref([])
const users = ref([])

// View options
const viewOptions = ref([
  { label: 'วัน', value: 'day' },
  { label: 'สัปดาห์', value: 'week' },
  { label: 'เดือน', value: 'month' }
])

// New booking form
const newBooking = ref({
  roomId: '',
  userId: '',
  date: '',
  startTime: '',
  endTime: '',
  notes: ''
})

// Hours for calendar grid (6 AM to 11 PM)
const hours = ref(Array.from({ length: 17 }, (_, i) => i + 6))

// Current time tracking
const showCurrentTime = ref(true)
const currentTime = ref(new Date())

// Computed properties
const currentMonthYear = computed(() => {
  return selectedDate.value.toLocaleDateString('th-TH', { 
    month: 'long', 
    year: 'numeric' 
  })
})

const currentPeriodTitle = computed(() => {
  if (currentView.value === 'day') {
    return selectedDate.value.toLocaleDateString('th-TH', { 
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
  } else if (currentView.value === 'week') {
    const startOfWeek = getStartOfWeek(selectedDate.value)
    const endOfWeek = new Date(startOfWeek)
    endOfWeek.setDate(endOfWeek.getDate() + 6)
    
    return `${startOfWeek.getDate()} - ${endOfWeek.getDate()} ${endOfWeek.toLocaleDateString('th-TH', { month: 'long', year: 'numeric' })}`
  } else {
    return selectedDate.value.toLocaleDateString('th-TH', { 
      month: 'long', 
      year: 'numeric' 
    })
  }
})

const weekDays = computed(() => {
  const startOfWeek = getStartOfWeek(selectedDate.value)
  const days = []
  
  for (let i = 0; i < 7; i++) {
    const date = new Date(startOfWeek)
    date.setDate(date.getDate() + i)
    
    days.push({
      key: `week-${date.toISOString()}`,
      date: date.getDate(),
      dayName: date.toLocaleDateString('th-TH', { weekday: 'short' }),
      fullDate: date,
      isToday: isToday(date)
    })
  }
  
  return days
})

const monthDates = computed(() => {
  const year = selectedDate.value.getFullYear()
  const month = selectedDate.value.getMonth()
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  const startDate = getStartOfWeek(firstDay)
  const dates = []
  
  let currentDate = new Date(startDate)
  
  for (let week = 0; week < 6; week++) {
    for (let day = 0; day < 7; day++) {
      const date = new Date(currentDate)
      dates.push({
        key: `month-${date.toISOString()}`,
        date: date,
        day: date.getDate(),
        fullDate: date,
        isCurrentMonth: date.getMonth() === month,
        isToday: isToday(date),
        isSelected: isSameDay(date, selectedDate.value)
      })
      currentDate.setDate(currentDate.getDate() + 1)
    }
  }
  
  return dates
})

const miniCalendarDates = computed(() => {
  const year = selectedDate.value.getFullYear()
  const month = selectedDate.value.getMonth()
  const firstDay = new Date(year, month, 1)
  const startDate = getStartOfWeek(firstDay)
  const dates = []
  
  let currentDate = new Date(startDate)
  
  for (let week = 0; week < 6; week++) {
    for (let day = 0; day < 7; day++) {
      const date = new Date(currentDate)
      const dayBookings = getBookingsForDay(date)
      
      dates.push({
        key: `mini-${date.toISOString()}`,
        date: date,
        day: date.getDate(),
        isCurrentMonth: date.getMonth() === month,
        isToday: isToday(date),
        isSelected: isSameDay(date, selectedDate.value),
        hasBookings: dayBookings.length > 0
      })
      currentDate.setDate(currentDate.getDate() + 1)
    }
  }
  
  return dates
})

const filteredBookings = computed(() => {
  let filtered = bookings.value

  // Filter by selected rooms
  if (!showAllRooms.value && selectedRooms.value.length > 0) {
    filtered = filtered.filter(booking => selectedRooms.value.includes(booking.roomId))
  }

  // Filter by search query
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(booking => 
      booking.room.name.toLowerCase().includes(query) ||
      booking.user.name.toLowerCase().includes(query) ||
      (booking.notes && booking.notes.toLowerCase().includes(query))
    )
  }

  return filtered
})

// Helper functions
const getStartOfWeek = (date) => {
  const d = new Date(date)
  const day = d.getDay()
  const diff = d.getDate() - day
  return new Date(d.setDate(diff))
}

const isToday = (date) => {
  const today = new Date()
  return isSameDay(date, today)
}

const isSameDay = (date1, date2) => {
  return date1.getDate() === date2.getDate() &&
         date1.getMonth() === date2.getMonth() &&
         date1.getFullYear() === date2.getFullYear()
}

const formatHour = (hour) => {
  return `${hour.toString().padStart(2, '0')}:00`
}

const formatTime = (dateString) => {
  return new Date(dateString).toLocaleTimeString('th-TH', { 
    hour: '2-digit', 
    minute: '2-digit' 
  })
}

const formatDateTime = (dateString) => {
  return new Date(dateString).toLocaleDateString('th-TH', { 
    day: 'numeric',
    month: 'short',
    hour: '2-digit', 
    minute: '2-digit' 
  })
}

const getRoomColor = (roomType) => {
  const colors = {
    'GENERAL_EXAMINATION': 'bg-blue-500',
    'PROCEDURE': 'bg-rose-500',
    'SPECIAL_EXAMINATION': 'bg-indigo-500',
    'CONFERENCE': 'bg-purple-500',
    'SURGERY': 'bg-red-500'
  }
  return colors[roomType] || 'bg-gray-500'
}

const getRoomColorClass = (roomType, light = false) => {
  const colors = {
    'GENERAL_EXAMINATION': light 
      ? 'bg-blue-50 text-blue-700 border border-blue-200' 
      : 'bg-gradient-to-br from-blue-500 to-blue-600 text-white',
    'PROCEDURE': light 
      ? 'bg-rose-50 text-rose-700 border border-rose-200' 
      : 'bg-gradient-to-br from-rose-500 to-rose-600 text-white',
    'SPECIAL_EXAMINATION': light 
      ? 'bg-indigo-50 text-indigo-700 border border-indigo-200' 
      : 'bg-gradient-to-br from-indigo-500 to-indigo-600 text-white',
    'CONFERENCE': light 
      ? 'bg-purple-50 text-purple-700 border border-purple-200' 
      : 'bg-gradient-to-br from-purple-500 to-purple-600 text-white',
    'SURGERY': light 
      ? 'bg-red-50 text-red-700 border border-red-200' 
      : 'bg-gradient-to-br from-red-500 to-red-600 text-white'
  }
  return colors[roomType] || (light 
    ? 'bg-gray-50 text-gray-700 border border-gray-200' 
    : 'bg-gradient-to-br from-gray-500 to-gray-600 text-white')
}

const getBookingStatusClass = (status) => {
  const statusClasses = {
    'CONFIRMED': 'bg-gradient-to-br from-emerald-500 to-green-600 border-emerald-400',
    'PENDING': 'bg-gradient-to-br from-orange-500 to-amber-600 border-orange-400',
    'CANCELLED': 'bg-gradient-to-br from-gray-400 to-gray-500 border-gray-300',
    'COMPLETED': 'bg-gradient-to-br from-blue-500 to-indigo-600 border-blue-400'
  }
  return statusClasses[status] || 'bg-gradient-to-br from-gray-500 to-gray-600 border-gray-400'
}

const getStatusIcon = (status) => {
  const icons = {
    'CONFIRMED': 'M5 13l4 4L19 7',
    'PENDING': 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
    'CANCELLED': 'M6 18L18 6M6 6l12 12',
    'COMPLETED': 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
  }
  return icons[status] || 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
}

const getStatusColor = (status) => {
  const colors = {
    'CONFIRMED': 'bg-emerald-100 text-emerald-700',
    'PENDING': 'bg-orange-100 text-orange-700',
    'CANCELLED': 'bg-rose-100 text-rose-700',
    'COMPLETED': 'bg-blue-100 text-blue-700'
  }
  return colors[status] || 'bg-gray-100 text-gray-700'
}

const getStatusText = (status) => {
  const texts = {
    'CONFIRMED': 'ยืนยันแล้ว',
    'PENDING': 'รอยืนยัน',
    'CANCELLED': 'ยกเลิก',
    'COMPLETED': 'เสร็จสิ้น'
  }
  return texts[status] || status
}

const getBookingsForDay = (date) => {
  return filteredBookings.value.filter(booking => {
    const bookingDate = new Date(booking.startTime)
    
    if (!isSameDay(bookingDate, date)) return false
    
    // Filter by booking status
    if (showInactiveBookings.value) {
      // Show all bookings when toggle is on
      return true
    } else {
      // Only show active bookings (PENDING and CONFIRMED)
      return booking.status === 'PENDING' || booking.status === 'CONFIRMED'
    }
  })
}

const getBookingStyle = (booking) => {
  const startTime = new Date(booking.startTime)
  const endTime = new Date(booking.endTime)
  
  const startHour = startTime.getHours()
  const startMinute = startTime.getMinutes()
  const endHour = endTime.getHours()
  const endMinute = endTime.getMinutes()
  
  const startOffset = ((startHour - 6) * 60 + startMinute) / 60 * 80 // 80px per hour
  const duration = ((endHour - startHour) * 60 + (endMinute - startMinute)) / 60 * 80
  
  return {
    top: `${startOffset}px`,
    height: `${Math.max(duration, 40)}px` // Minimum height of 40px
  }
}

const getCurrentTimeStyle = () => {
  const now = new Date()
  const hour = now.getHours()
  const minute = now.getMinutes()
  
  const offset = ((hour - 6) * 60 + minute) / 60 * 80 // 80px per hour
  
  return {
    top: `${offset}px`
  }
}

const createQuickBooking = (date, event) => {
  const rect = event.currentTarget.getBoundingClientRect()
  const y = event.clientY - rect.top
  const hour = Math.floor(y / 80) + 6 // 80px per hour, starting from 6 AM
  const minute = Math.round((y % 80) / 80 * 60 / 15) * 15 // Round to nearest 15 minutes
  
  const startTime = new Date(date)
  startTime.setHours(hour, minute, 0, 0)
  
  const endTime = new Date(startTime)
  endTime.setHours(startTime.getHours() + 1) // Default 1 hour duration
  
  newBooking.value = {
    roomId: '',
    userId: '',
    date: date.toISOString().split('T')[0],
    startTime: startTime.toTimeString().slice(0, 5),
    endTime: endTime.toTimeString().slice(0, 5),
    notes: ''
  }
  
  showCreateModal.value = true
}

const viewMoreBookings = (date) => {
  selectDate(date)
  currentView.value = 'day'
}

// Navigation functions
const previousPeriod = () => {
  const newDate = new Date(selectedDate.value)
  
  if (currentView.value === 'day') {
    newDate.setDate(newDate.getDate() - 1)
  } else if (currentView.value === 'week') {
    newDate.setDate(newDate.getDate() - 7)
  } else if (currentView.value === 'month') {
    newDate.setMonth(newDate.getMonth() - 1)
  }
  
  selectedDate.value = newDate
}

const nextPeriod = () => {
  const newDate = new Date(selectedDate.value)
  
  if (currentView.value === 'day') {
    newDate.setDate(newDate.getDate() + 1)
  } else if (currentView.value === 'week') {
    newDate.setDate(newDate.getDate() + 7)
  } else if (currentView.value === 'month') {
    newDate.setMonth(newDate.getMonth() + 1)
  }
  
  selectedDate.value = newDate
}

const goToToday = () => {
  selectedDate.value = new Date()
}

const selectDate = (date) => {
  selectedDate.value = new Date(date)
  if (currentView.value === 'month') {
    currentView.value = 'day'
  }
}

const selectBooking = (booking) => {
  selectedBooking.value = booking
}

const toggleAllRooms = () => {
  if (showAllRooms.value) {
    selectedRooms.value = rooms.value.map(room => room.id)
  } else {
    selectedRooms.value = []
  }
}

// API functions
const fetchRooms = async () => {
  try {
    const response = await fetch(`${API_BASE}/rooms`)
    if (!response.ok) throw new Error('Failed to fetch rooms')
    const data = await response.json()
    rooms.value = data
    selectedRooms.value = data.map(room => room.id)
  } catch (error) {
    console.error('Error fetching rooms:', error)
  }
}

const fetchBookings = async () => {
  try {
    const response = await fetch(`${API_BASE}/bookings`)
    if (!response.ok) throw new Error('Failed to fetch bookings')
    const data = await response.json()
    bookings.value = data
  } catch (error) {
    console.error('Error fetching bookings:', error)
  }
}

const fetchUsers = async () => {
  try {
    const response = await fetch(`${API_BASE}/users`)
    if (!response.ok) throw new Error('Failed to fetch users')
    const data = await response.json()
    users.value = data
  } catch (error) {
    console.error('Error fetching users:', error)
  }
}

const confirmCancelBooking = (bookingId) => {
  bookingToCancel.value = bookingId
  showCancelConfirm.value = true
}

const cancelBookingConfirmed = async () => {
  if (!bookingToCancel.value) return
  
  try {
    const response = await fetch(`${API_BASE}/bookings/${bookingToCancel.value}/status`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ status: 'CANCELLED' })
    })
    
    if (!response.ok) throw new Error('Failed to cancel booking')
    
    // Update local data
    const bookingIndex = bookings.value.findIndex(b => b.id === bookingToCancel.value)
    if (bookingIndex !== -1) {
      bookings.value[bookingIndex].status = 'CANCELLED'
    }
    
    showCancelConfirm.value = false
    bookingToCancel.value = null
    selectedBooking.value = null
  } catch (error) {
    console.error('Error cancelling booking:', error)
    alert('เกิดข้อผิดพลาดในการยกเลิกการจอง')
  }
}

const updateBookingStatus = async (bookingId, status) => {
  try {
    const response = await fetch(`${API_BASE}/bookings/${bookingId}/status`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ status })
    })
    
    if (!response.ok) throw new Error('Failed to update booking status')
    
    // Update local data
    const bookingIndex = bookings.value.findIndex(b => b.id === bookingId)
    if (bookingIndex !== -1) {
      bookings.value[bookingIndex].status = status
    }
    
    selectedBooking.value = null
  } catch (error) {
    console.error('Error updating booking status:', error)
    alert('เกิดข้อผิดพลาดในการอัปเดตสถานะ')
  }
}

const createBooking = async () => {
  try {
    const startDateTime = new Date(`${newBooking.value.date}T${newBooking.value.startTime}`)
    const endDateTime = new Date(`${newBooking.value.date}T${newBooking.value.endTime}`)
    
    const response = await fetch(`${API_BASE}/bookings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        roomId: newBooking.value.roomId,
        userId: newBooking.value.userId,
        startTime: startDateTime.toISOString(),
        endTime: endDateTime.toISOString(),
        notes: newBooking.value.notes
      })
    })
    
    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || 'Failed to create booking')
    }
    
    // Refresh bookings list
    await fetchBookings()
    
    // Reset form
    newBooking.value = {
      roomId: '',
      userId: '',
      date: '',
      startTime: '',
      endTime: '',
      notes: ''
    }
    
    showCreateModal.value = false
    alert('จองห้องสำเร็จ!')
  } catch (error) {
    console.error('Error creating booking:', error)
    alert(error.message || 'เกิดข้อผิดพลาดในการจองห้อง')
  }
}

// Initialize data
const loadData = async () => {
  await Promise.all([
    fetchRooms(),
    fetchBookings(),
    fetchUsers()
  ])
}

// Watch for room selection changes
watch(selectedRooms, (newValue) => {
  if (newValue.length === 0) {
    showAllRooms.value = false
  } else if (newValue.length === rooms.value.length) {
    showAllRooms.value = true
  } else {
    showAllRooms.value = false
  }
}, { deep: true })

// Set default date for new booking
watch(selectedDate, (newDate) => {
  newBooking.value.date = newDate.toISOString().split('T')[0]
})

// Load data on mount
onMounted(() => {
  getCurrentUser()
  loadData()
  newBooking.value.date = selectedDate.value.toISOString().split('T')[0]
  
  // Update current time every minute
  const timeInterval = setInterval(() => {
    currentTime.value = new Date()
  }, 60000)
  
  // Cleanup interval on unmount
  onUnmounted(() => {
    clearInterval(timeInterval)
  })
})
</script>