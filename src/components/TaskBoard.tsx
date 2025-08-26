
import React, { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import TaskColumn, { Column } from './TaskColumn';
import { Task } from './TaskCard';

// Initial data for the task board
const initialColumns: Column[] = [
  {
    id: 'lead',
    title: 'Lead',
    color: 'muted',
    tasks: [
      {
        id: 't1',
        title: 'Johnson Family - Downtown Condo',
        description: 'First-time buyers looking for 2BR condo, budget $450K',
        tag: { color: 'blue', label: 'Buyers' },
        dueDate: 'Dec 15',
        assignees: 1,
        progress: { completed: 1, total: 5 }
      },
      {
        id: 't2',
        title: 'Mike Chen - Investment Property',
        description: 'Investor seeking duplex for rental income',
        tag: { color: 'purple', label: 'Investment' },
        dueDate: 'Dec 18',
        assignees: 1,
        progress: { completed: 0, total: 4 }
      },
      {
        id: 't3',
        title: 'Sarah Williams - Family Home',
        description: 'Growing family needs 4BR in good school district',
        tag: { color: 'blue', label: 'Buyers' },
        dueDate: 'Dec 20',
        assignees: 1,
        progress: { completed: 2, total: 6 }
      },
      {
        id: 't4',
        title: 'David Brown - Luxury Listing',
        description: 'High-end property seller, $2.2M waterfront home',
        tag: { color: 'accent', label: 'Sellers' },
        dueDate: 'Dec 22',
        assignees: 1,
        progress: { completed: 1, total: 3 }
      }
    ]
  },
  {
    id: 'qualified',
    title: 'Qualified',
    color: 'blue',
    tasks: [
      {
        id: 't5',
        title: 'Martinez Family - Starter Home',
        description: 'Pre-approved for $380K, actively viewing properties',
        tag: { color: 'blue', label: 'Buyers' },
        dueDate: 'Dec 12',
        assignees: 1,
        progress: { completed: 3, total: 5 }
      },
      {
        id: 't6',
        title: 'Tom Anderson - Relocation',
        description: 'Corporate relocation, needs to close by end of month',
        tag: { color: 'blue', label: 'Buyers' },
        dueDate: 'Dec 30',
        assignees: 1,
        progress: { completed: 4, total: 7 }
      },
      {
        id: 't7',
        title: 'Lisa Garcia - Downsizing',
        description: 'Empty nesters selling large home, buying smaller',
        tag: { color: 'accent', label: 'Sellers' },
        dueDate: 'Dec 28',
        assignees: 1,
        progress: { completed: 2, total: 4 }
      }
    ]
  },
  {
    id: 'contract',
    title: 'Under Contract',
    color: 'amber',
    tasks: [
      {
        id: 't8',
        title: 'Roberts Family - Suburban Home',
        description: 'Contract signed, awaiting inspection results',
        tag: { color: 'blue', label: 'Buyers' },
        dueDate: 'Dec 10',
        assignees: 1,
        progress: { completed: 6, total: 8 }
      },
      {
        id: 't9',
        title: 'Jennifer Kim - Townhouse',
        description: 'Financing approved, appraisal scheduled',
        tag: { color: 'blue', label: 'Buyers' },
        dueDate: 'Dec 14',
        assignees: 1,
        progress: { completed: 7, total: 9 }
      },
      {
        id: 't10',
        title: 'Smith Property - Ranch Style',
        description: 'Multiple offers received, negotiating terms',
        tag: { color: 'accent', label: 'Sellers' },
        dueDate: 'Dec 16',
        assignees: 1,
        progress: { completed: 5, total: 6 }
      }
    ]
  },
  {
    id: 'closed',
    title: 'Closed',
    color: 'accent',
    tasks: [
      {
        id: 't11',
        title: 'Peterson Family - Dream Home',
        description: 'Successfully closed on 3BR colonial, $525K',
        tag: { color: 'blue', label: 'Buyers' },
        dueDate: 'Dec 1',
        assignees: 1,
        progress: { completed: 8, total: 8 }
      },
      {
        id: 't12',
        title: 'Wilson Condo - Downtown',
        description: 'Investment property sale completed, $310K',
        tag: { color: 'purple', label: 'Investment' },
        dueDate: 'Nov 28',
        assignees: 1,
        progress: { completed: 6, total: 6 }
      },
      {
        id: 't13',
        title: 'Thompson Estate - Luxury',
        description: 'High-end listing sold above asking, $1.8M',
        tag: { color: 'accent', label: 'Sellers' },
        dueDate: 'Nov 25',
        assignees: 1,
        progress: { completed: 9, total: 9 }
      }
    ]
  }
];

interface TaskBoardProps {
  className?: string;
}

const TaskBoard: React.FC<TaskBoardProps> = ({ className }) => {
  const [columns, setColumns] = useState<Column[]>(initialColumns);
  const [draggedTask, setDraggedTask] = useState<Task | null>(null);
  const [dragSourceColumn, setDragSourceColumn] = useState<string | null>(null);
  const { toast } = useToast();

  const handleTaskDragStart = (e: React.DragEvent, task: Task) => {
    e.dataTransfer.setData('taskId', task.id);
    setDraggedTask(task);
    
    // Find source column
    const sourceColumn = columns.find(col => 
      col.tasks.some(t => t.id === task.id)
    );
    
    if (sourceColumn) {
      setDragSourceColumn(sourceColumn.id);
      e.dataTransfer.setData('sourceColumnId', sourceColumn.id);
    }
  };

  const handleTaskDragEnd = () => {
    setDraggedTask(null);
    setDragSourceColumn(null);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDragLeave = (e: React.DragEvent) => {
    // Handle drag leave logic if needed
  };

  const handleDrop = (e: React.DragEvent, targetColumnId: string) => {
    e.preventDefault();
    
    const taskId = e.dataTransfer.getData('taskId');
    const sourceColumnId = e.dataTransfer.getData('sourceColumnId');
    
    if (!taskId || !sourceColumnId || sourceColumnId === targetColumnId) {
      return;
    }
    
    // Update columns state
    const newColumns = columns.map(column => {
      // Remove task from source column
      if (column.id === sourceColumnId) {
        return {
          ...column,
          tasks: column.tasks.filter(task => task.id !== taskId)
        };
      }
      
      // Add task to target column
      if (column.id === targetColumnId) {
        const taskToMove = columns.find(col => col.id === sourceColumnId)?.tasks.find(task => task.id === taskId);
        if (taskToMove) {
          return {
            ...column,
            tasks: [...column.tasks, taskToMove]
          };
        }
      }
      
      return column;
    });
    
    setColumns(newColumns);
    
    // Show a toast notification
    const targetColumn = columns.find(col => col.id === targetColumnId);
    if (targetColumn && draggedTask) {
      toast({
        title: "Task moved",
        description: `${draggedTask.title} moved to ${targetColumn.title}`,
      });
    }
  };

  const handleStatusChange = (taskId: string, newStatus: string) => {
    // This function can be used for programmatic status changes (not used in this implementation)
  };

  return (
    <div className={`flex gap-4 overflow-x-auto pb-4 ${className}`}>
      {columns.map(column => (
        <TaskColumn
          key={column.id}
          column={column}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onTaskDragStart={handleTaskDragStart}
          onTaskDragEnd={handleTaskDragEnd}
          onStatusChange={handleStatusChange}
        />
      ))}
    </div>
  );
};

export default TaskBoard;
