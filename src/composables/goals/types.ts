export interface GoalEvaluation {
  has_error: boolean;
  error_msg: string;
  is_smart: boolean;
  adjusted_goal: string | null;
  percentage: number;
  is_specific: number;
  is_measurable: number;
  is_achievable: number;
  is_relevant: number;
  is_time_bound: number;
}
