// Notification and activity utilities
export const getGreeting = (firstName) => {
  const hour = new Date().getHours();
  let greeting = 'Hello';
  
  if (hour < 12) {
    greeting = 'Good morning';
  } else if (hour < 17) {
    greeting = 'Good afternoon';
  } else {
    greeting = 'Good evening';
  }
  
  return `${greeting}, ${firstName || 'Student'}!`;
};

export const getMotivationalMessage = (complaintsCount, resolvedCount) => {
  if (complaintsCount === 0) {
    return "Ready to submit your first complaint? Your voice matters!";
  }
  
  const successRate = complaintsCount > 0 ? (resolvedCount / complaintsCount) * 100 : 0;
  
  if (successRate >= 80) {
    return "Excellent! You're making great progress with your complaints.";
  } else if (successRate >= 60) {
    return "Good work! Keep following up on your complaints.";
  } else if (successRate >= 40) {
    return "Hang in there! Your complaints are being processed.";
  } else {
    return "Don't worry! We're here to help resolve your concerns.";
  }
};

export const getRecentActivity = (complaints) => {
  if (!complaints || complaints.length === 0) return [];
  
  return complaints
    .sort((a, b) => new Date(b.updatedAt || b.createdAt) - new Date(a.updatedAt || a.createdAt))
    .slice(0, 5)
    .map(complaint => ({
      id: complaint._id,
      type: 'complaint_update',
      title: complaint.title,
      status: complaint.status,
      timestamp: complaint.updatedAt || complaint.createdAt,
      message: getActivityMessage(complaint)
    }));
};

export const getActivityMessage = (complaint) => {
  const status = complaint.status?.toLowerCase();
  
  switch (status) {
    case 'pending':
      return 'Your complaint has been submitted and is under review';
    case 'in progress':
      return 'Your complaint is being processed by the administration';
    case 'resolved':
      return 'Your complaint has been successfully resolved!';
    case 'rejected':
      return 'Your complaint was reviewed but could not be processed';
    default:
      return 'Your complaint status has been updated';
  }
};

export const getProgressData = (complaints) => {
  if (!complaints || complaints.length === 0) {
    return {
      total: 0,
      pending: 0,
      inProgress: 0,
      resolved: 0,
      rejected: 0,
      successRate: 0,
      averageResponseTime: 0
    };
  }
  
  const total = complaints.length;
  const pending = complaints.filter(c => c.status === 'Pending').length;
  const inProgress = complaints.filter(c => c.status === 'In Progress').length;
  const resolved = complaints.filter(c => c.status === 'Resolved').length;
  const rejected = complaints.filter(c => c.status === 'Rejected').length;
  const successRate = total > 0 ? (resolved / total) * 100 : 0;
  
  // Calculate average response time (simplified)
  const resolvedComplaints = complaints.filter(c => c.status === 'Resolved');
  const averageResponseTime = resolvedComplaints.length > 0 
    ? resolvedComplaints.reduce((acc, c) => {
        const created = new Date(c.createdAt);
        const updated = new Date(c.updatedAt);
        return acc + (updated - created);
      }, 0) / resolvedComplaints.length / (1000 * 60 * 60 * 24) // Convert to days
    : 0;
  
  return {
    total,
    pending,
    inProgress,
    resolved,
    rejected,
    successRate: Math.round(successRate),
    averageResponseTime: Math.round(averageResponseTime)
  };
};

export const getQuickActions = () => {
  return [
    {
      id: 'new-complaint',
      title: 'Submit Complaint',
      description: 'Report a new issue or concern',
      icon: '📝',
      color: 'bg-blue-500',
      action: '/student/new-complaint',
      type: 'route'
    },
    {
      id: 'view-pending',
      title: 'Pending Complaints',
      description: 'Check your pending complaints',
      icon: '⏱️',
      color: 'bg-yellow-500',
      type: 'tab',
      tab: 'Pending'
    },
    {
      id: 'view-resolved',
      title: 'Resolved Issues',
      description: 'View successfully resolved complaints',
      icon: '✅',
      color: 'bg-green-500',
      type: 'tab',
      tab: 'Resolved'
    },
    {
      id: 'help-support',
      title: 'Help & Support',
      description: 'Get help with the system',
      icon: '❓',
      color: 'bg-purple-500',
      action: '/help',
      type: 'route'
    }
  ];
}; 